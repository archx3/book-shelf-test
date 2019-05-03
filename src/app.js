var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const passport = require('passport');



var app = express();


//connect to mongodb through mongoose
mongoose.connect('mongodb://localhost:27017/book_ave', { useNewUrlParser : true });
//replacing the promise Object used in mongoose cos it's stale
//mongoose.Promise = global.Promise;

//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function ()
{
  // we're connected!
  console.log("We're connected to the Mongo database");
});
require('./models');

//let's use morgan to log stuff to our console silently
app.use(morgan("dev"));

// let's make the /uploads folder static and publicly accessible
app.use('/uploads', express.static('uploads'));

//set up request body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended : true })); // support url encoded bodies

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'src/public'),
  dest: path.join(__dirname, 'src/public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));


//let's avoid CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // If the incoming request method is OPTIONS,
  // it means the client is asking for the HTTP verbs we support
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //let's send it to them
    return res.status(200).json({});
  }
  next();
});

require('./authentication').init(app);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user._id)
});

let Users = require('./models/User');

passport.deserializeUser(function (id, cb) {
  Users.findOne({_id: id}).then(function (user) {
    return cb(null, user);
  }).catch(function (err) {
    return callback(err);
  });
});

//let's now register our routes
// initialise routes and handlers
// prefix all api related routes with '/api
app.use('/api', require('./api/routes/api'));
//let's register auth routes here
app.use('/auth', require('./api/routes/auth'));
//let's register web related routes here
app.use('/', require('./api/routes/web'));

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
