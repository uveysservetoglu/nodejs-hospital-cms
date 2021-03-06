const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter  = require('./routes/blog');
const blogPostRouter  = require('./routes/blogPost');
const contractedInstitutionRouter  = require('./routes/contractedInstitution');
const departmentRouter  = require('./routes/department');
const hospitalRouter  = require('./routes/hospital');
const language  = require('./routes/language');
const media  = require('./routes/media');

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//api secret
const config = require("./helper/config");
app.set("api_secret_key", config.api_secret_key);

//Database Connection
const db = require('./helper/db')();

//token verify
const verifyToken = require("./middleware/verify-token");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/blog-post', blogPostRouter);
app.use('/api/contracted-institution', contractedInstitutionRouter);
app.use('/api/department', departmentRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/language', language);
app.use('/api/media', media);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found 404");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.json({
        error:{message:err.message, code:err.code}
    });
});

module.exports = app;
