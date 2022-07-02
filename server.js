const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect("mongodb://localhost/todoapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log("DB Connected");
  })
  .catch(err => {
    console.log("DB Error", err.name);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to log request information
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// to send user profile pic
app.use("/pic", express.static("uploads"));

// controllers
app.use("/todo", require("./controllers/todo"));
app.use("/user", require("./controllers/user"));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, console.log(`Serving on ${PORT}`));
