const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/discs");

// POST ROUTES

router.get('/api/todos', function (req, res) {
    collectionName.find({}).then(function (data) {
        res.json(data);
    })
})

router.post('/api/todos', function (req, res) {
    var todo = new todo({
        item: req.body.title
    });
    todo.save().then(function (data) {
        res.redirect('api/todos');
    })
});

router.get('/api/todos/:id', function (req, res) {
    var todoId = req.params.id
    collectionName.find({ _id: todoId }).then(function (data) {
        res.json(data);
    });
});