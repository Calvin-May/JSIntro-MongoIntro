"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
let indexRouter = require('./Routes/index');
const DBConfig = require("./Config/db");
mongoose.connect(DBConfig.Path);
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Connection Error'));
dbConnection.once('open', function () {
    console.log(`Connected to MongoDB at: ${DBConfig.Path}`);
});
const app = express();
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/', indexRouter);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    let message = err.message;
    let error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { message: message, error: error, title: 'Error', page: 'error' });
});
module.exports = app;
//# sourceMappingURL=app.js.map