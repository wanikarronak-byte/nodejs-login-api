const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
  email: String,
  first_name: String,
  last_name: String
});

module.exports = mongoose.model("User", UserSchema);