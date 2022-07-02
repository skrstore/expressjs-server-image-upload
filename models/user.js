const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userPicPath: String
});

module.exports = mongoose.model("User", userSchema);
