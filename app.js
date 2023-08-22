var createError = require('http-errors');
const mysql = require('mysql');
var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '123456',      // Replace with your database password
  database: 'blindlove' // // Replace with your database Name
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', function(request, response){
  response.sendFile(__dirname, "/index.html");
});
app.get('/surveyresult', function (request, response) {
  let answer = "";
 
 
  conn.query('SELECT pId, psurveyresultDetails FROM surveyresult ORDER BY pId desc', function (err, result) {
    if (err) throw err;
   // console.log("Result: " + JSON.stringify(result));
     answer = result[Math.floor(Math.random()*result.length)].psurveyresultDetails;
     response.send(answer);
  });

 
  
});

app.post('/subscribe', (req, res) => {
  console.log("posted"+JSON.stringify(req.body));
   var sql = "INSERT INTO subscribers (sname, age,gender,email) VALUES ('"+req.body.name+"','"+req.body.age+"','"+req.body.gender+"','"+req.body.email+"')";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.send(""+req.body.name);
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));


module.exports = app;
