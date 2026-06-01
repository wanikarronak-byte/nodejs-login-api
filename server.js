const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usersData = JSON.parse(
    fs.readFileSync("./users.json", "utf8")
  );

  const user = usersData.users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        username: user.username
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Username or Password"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});