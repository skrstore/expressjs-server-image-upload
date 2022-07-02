const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("./../models/user");
const checkAuth = require("./../middlewares/checkAuth");
const upload = require("./../middlewares/imageUpload");

// route to send User detail
router.get("/", checkAuth, (req, res) => {
  let user_id = req.user.id;

  User.findById(user_id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(404).json({ error: "Resource Not Found" });
    });
});

let myupload = upload.single("userPic");
// route to save a User
router.post("/signup", (req, res) => {
  // checking for the error from the imageUpload if email already exixts
  myupload(req, res, err => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    const { name, email, password } = req.body;
    const userPicPath = req.file.filename;
    let msg1 = new User({
      name,
      email,
      password,
      userPicPath
    });

    msg1
      .save()
      .then(result => {
        res.json({ result: "User Saved" });
      })
      .catch(err => {
        res.status(404).json({ result: "Error in Saving the Data" });
      });
  });
});

// route to login a user
router.post("/login", (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  User.find({ email: email, password: password })
    .then(users => {
      if (users.length > 0) {
        let data = {
          email: users[0].email,
          id: users[0]._id
        };
        const token = jwt.sign(data, "secret");
        res.json({ message: "Login Success", token: token });
      } else {
        res.json({ message: "Email or Password is Incorrect" });
      }
    })
    .catch(err => {
      res.json({ error: "Auth Error" });
    });
});

// route to delete User
router.delete("/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  User.findByIdAndDelete(user_id).then(result => {
    res.json({ message: "User Deleted" });
  });
});

module.exports = router;
