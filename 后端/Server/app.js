var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs= require('fs')
var indexRouter = require('./routes/index');

var login=require("./routes/login")
var rigist=require('./routes/rigist')
var getAdd=require("./routes/getAdd")
var getPostions=require('./routes/getPostions')
var add=require("./routes/add")
var app = express();

var cors=require('cors')

app.use(cors('http://47.97.22.215'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use("/api",login)
app.use('/api',rigist)
app.use("/api",add)
app.use('/api',getPostions)
app.use("/api",getAdd)

app.get("/",function(req,res){
  fs.readFile('./Public/index.html',(err, data) => {
    if (err) throw err;
    res.send(data)
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
