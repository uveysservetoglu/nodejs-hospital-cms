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


//Database Connection
const db = require('./helper/db')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/blog-post', blogPostRouter);
app.use('/contracted-institution', contractedInstitutionRouter);
app.use('/department', departmentRouter);
app.use('/hospital', hospitalRouter);
app.use('/language', language);
app.use('/media', media);

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
