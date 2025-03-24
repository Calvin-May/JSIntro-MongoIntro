// Third Party Modules
import createError = require('http-errors');
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import mongoose = require('mongoose');

// Routing
let indexRouter = require('./Routes/index');

// DB Configuration
import DBConfig = require('./Config/db');
mongoose.connect(DBConfig.Path);

const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Connection Error'));
dbConnection.once('open', function() {
  console.log(`Connected to MongoDB at: ${DBConfig.Path}`);
});

// Web App Instance
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  // set locals, only providing error in development (Old way, look below for custom error handling)
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Custom Error Handling without using res.locals
  let message = err.message;
  let error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: message, error: error, title: 'Error', page: 'error' } );
});

module.exports = app;
