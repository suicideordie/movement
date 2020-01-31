if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//require for login libraries
var fs = require('fs');
//require library for password encryption and other stuff
var bcrypt = require('bcryptjs');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var methodOverride = require('method-override');

var data = fs.readFileSync('post.json');
//convert in JSON
var post = JSON.parse(data);

console.log(post);
console.log('server is working');

var express = require('express');
var app = express();

//open the server to listen
var server = app.listen(process.env.PORT || 3000, listening);

var initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

//blog users data
var users = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());

// Create a session for developing and debugging
app.use(session({
  secret: process.env.SESSION_SECRET,
  //resave our variables if nothing is changed
  resave: false,
  //save empty value if set on true
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//host static files
app.use(express.static('views'));

//callback to check if connection is working
function listening() {
  console.log('listening. . .');
}

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new Connection: ' + socket.id);
}

app.get('/add/:name/:text?', addWords);

function addWords(request, response) {
  var data = request.params;
  var name = data.name;
  var text = data.text;
  var reply;
  //re-convert data in text object
  if(!text){
    reply = {
      msg: "score is required."
    }
  } else {
    post[name] = text;
    var data = JSON.stringify(post, null, 2);
    fs.writeFile('post.json', data, finished);

    function finished(err) {
      console.log('all set.');
    }

    reply = {
      msg: "thanks."
    }
  }
}

app.get('/all', sendAll);

function sendAll(request, response) {
  response.send(post);
}

app.get('/blog', checkAuthenticated, (req, res) => {
  res.render('index_blog.ejs');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
  console.log(users);
});

//logout method
app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

//check if you can go on index page
function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

//check if you are logged in. Y>you cannot return to login page
function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}
