const express = require("express");
const router = express.Router();

const Todo = require("./../models/todo");
const checkAuth = require("./../middlewares/checkAuth");

// route to send all todos
router.get("/", checkAuth, (req, res) => {
  Todo.find({ userId: req.user.id })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: "Error" });
    });
});

// route to send one todo
// router.get("/:todo_id", (req, res) => {
//   let todo_id = req.params.todo_id;
//   //   let rex = new RegExp(q, "i");
//   //   Std.find({ name: { $regex: rex } }, { name: 1, _id: 0 }).then(result => {
//   //     res.json(result);
//   //   });
//   Todo.findById(todo_id)
//     .then(todo => {
//       res.json(todo);
//     })
//     .catch(err => {
//       res.status(404).json({ error: "Resource Not Found" });
//     });
// });

// route to save a todo
router.post("/", checkAuth, (req, res) => {
  const { message } = req.body;
  let msg1 = new Todo({
    message: message,
    userId: req.user.id
  });

  msg1
    .save()
    .then(result => {
      res.json({ result: "Todo Saved" });
    })
    .catch(err => {
      res.status(404).json({ error: "Error in Saving" });
    });
});

// route to delete todo
router.delete("/:todo_id", checkAuth, (req, res) => {
  let todo_id = req.params.todo_id;
  Todo.findByIdAndDelete(todo_id).then(result => {
    res.json({ result: "Todo Deleted" });
  });
});

module.exports = router;
