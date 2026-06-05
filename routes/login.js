const express = require("express");
const router = express.Router();

const User = require("../Models/User");

// LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password were sent
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required"
      });
    }

    // Remove extra spaces
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    const allUsers = await User.find();
    console.log("All users:", allUsers);

    // Find user by username
    const user = await User.findOne({
      username: cleanUsername
    });

    console.log("Username entered:", cleanUsername);
    console.log("User found:", user);

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // Check password
    if (user.password !== cleanPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;