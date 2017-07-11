const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/swaggymcswaggerton");

const toDoItems = new Schema({
    taskName: { type: String, required: true },
    taskOrder: { type: Number },
    isComplete: { type: Boolean }
});

const tasks = mongoose.model("taskList", toDoItems);

router.get('/api/tasks/', function (req, res) {
    tasks.find({}).then(function (data) {
        res.json(data);
    })
});

router.get('/api/tasks/:id', function (req, res) {
    var todoId = req.params.id
    tasks.find({ _id: todoId }).then(function (data) {
        res.json(data);
    })
});

router.post('api/tasks/', function (req, res) {
    var todo = new todo({
        taskName: req.body.task,
        taskOrder: req.body.taskOrder,
        isComplete: req.body.finished
    });
    todo.save().then(function (data) {
        res.redirect('/api/tasks/');
    })
});

router.put('/api/tasks/:id', function (req, res) {
    var paramId = req.params.id;
    tasks.updateOne({ _id: req.body.edit },
        {
            taskName: req.body.task,
            taskOrder: req.body.taskOrder,
            isComplete: req.body.finished
        }).then(function (data) {
            res.redirect('/');
        })
});

router.patch('/api/tasks/:id', function (req, res) {
    var paramId = req.params.id;
    tasks.updateOne({ _id: req.body.edit },
        {
            taskName: req.body.task
        }).then(function (data) {
            res.redirect('/');
        })
});


router.delete('/api/tasks/:id', function (req, res) {
    tasks.deleteOne({ _id: req.body.deleteKey }).then(function (films) {
        res.redirect('/');
    });
});

module.exports = tasks;
module.exports = router;