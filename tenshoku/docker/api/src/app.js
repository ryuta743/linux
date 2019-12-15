var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// mysqlを読み込む
var mysql = require('mysql');

// mysqlと接続する
var db = mysql.createConnection({
  // host: 'mariadb',
  host: 'http://db:3306/',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

// userListsを表示
app.get('/showUserLists', function (req, res) {
  const id = req.query.id;
  const sql = `SELECT * FROM userLists;`;
  db.query(sql, function (error, results) {
    if (error) return res.json(error);
    res.json(results);
    //console.log(results);
  })
})