const multer = require("multer");
const path = require("path");
const User = require("./../models/user");

// Upload storage Setting
const DIR = "./uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Checking Email Already Exists or Not of Exists the throw error here because we not want to upload file if user already exixts
    User.find({ email: req.body.email }).then(users => {
      if (users.length === 0) {
        cb(null, DIR);
      } else {
        cb(new Error("Email Already Exixts"), DIR);
      }
    });
  },
  filename: (req, file, cb) => {
    console.log("!!", req.body);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
module.exports = multer({ storage: storage });
