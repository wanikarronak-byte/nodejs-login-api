const fs = require("fs");
const path = require("path");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing"
    });
  }

  const encoded = authHeader.split(" ")[1];

  const decoded = Buffer.from(encoded, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");

  const usersFile = path.join(__dirname, "../users.json");
  const usersData = JSON.parse(fs.readFileSync(usersFile));

  const user = usersData.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }

  req.user = user;

  next();
};

module.exports = auth;