//SWAGG SAUCE

const fs = require('fs');
const path = require('path');
const express = require('express');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')
const app = express();

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);

app.listen(3000, function () {
    console.log('Express app running at: http://localhost:3000/.')
});