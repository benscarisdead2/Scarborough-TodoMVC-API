const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/anotherdb");

const items = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  order: { type: Number },
  completed: { type: Boolean }
});

const todos = mongoose.model("todoList", items);

router.get('/api/todos/', function (req, res) {
  todos.find({}).then(function (data) {
    res.json(data);
  })
});

router.get('/api/todos/task/:id', function (req, res) {
  var todoId = req.params.id
  todos.find({ id: todoId }).then(function (data) {
    res.json(data);
  })
});

router.post('/api/todos/', function (req, res) {
  var items = new todos({
    id: req.body.id,
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  });
  items.save().then(function (data) {
    res.json(data);
  })
});

router.put('/api/todos/:id', function (req, res) {
  var editId = req.params.id;
  todos.updateOne({ id: editId },
    {
      title: req.body.title,
      order: req.body.order,
      completed: req.body.completed
    }).then(function (data) {
      res.json(data);
    })
});

router.patch('/api/todos/:id', function (req, res) {
  var editId = req.params.id;
  todos.updateOne({ id: editId },
    {
      title: req.body.task
    }).then(function (data) {
      res.json(data);
    })
});


router.delete('/api/todos/:id', function (req, res) {
  var deleteID = req.params.id
  todos.deleteOne({ id: deleteID }).then(function (sneaker) {
    res.json(sneaker);
  });
});

module.exports = router;
