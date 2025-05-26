var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const loggerFile = require('./Middlewares/logger');
var CelularesRouter = require('./routes/Celulares');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(loggerFile);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/Celulares', CelularesRouter);

module.exports = app;