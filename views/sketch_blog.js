var user;
var username;
var socket;
var keys;
var keyslen;
var id = 0;

function setup() {
  noCanvas();
  console.log("working");
  loadJSON('all', showData);

  var button = select('#postbutton');
  button.mousePressed(submitPost);

  socket = io.connect();
  // socket.emit('username', data);
  socket.on('username', receiveName);
}

function receiveName(data) {
  user = data;
}

function showData(data) {
  var post;
  var container;
  var author;

  var blogbox = document.getElementById("blogbox");
  entries = Object.entries(data);
  // console.log(keys);

  for (var i = 0; i < entries.length; i++) {

    console.log(entries);

    container = createDiv();
    container.addClass("post");
    container.parent("blogbox")
    author = createP(entries[i][1][1]);
    author.addClass("postText");
    author.parent(container);
    post = createP("Written by " + entries[i][1][0] + " on " + entries[i][1][2]);
    post.addClass("postAuthor");
    post.parent(container);

  }
}

function submitPost() {

  loadJSON('all', incId);
}

function incId(data) {
  var date = "03-02-2020";
  var text = select('#text').value();
  var post;
  var container;
  var author;
  if(user != null){
    console.log("user != null");
    username = user;
    console.log(username);
  }

  if(user == null){
    console.log("user == null");
    user = username;
    console.log(username);
  }
  keys = Object.keys(data);
  console.log(keys);
  keyslen = keys.length;
  console.log("id init: " + id);
  console.log("lunghezza chiave init: " + keyslen);
  if(keyslen > 0) {
    console.log("lunghezza chiave mid: " + keyslen);
    // keyslen = keyslen - 1;
    id = Number(keyslen);
  } else {
    console.log("else");
    id = 0;
  }
  console.log("keys lenfth " + keys.length);
  console.log("id end: " + id);
  console.log("lunghezza chiave end: " + keyslen);

  console.log("user injt: " + username);
  loadJSON('/add/' + id + '/' + user + '/' + text + '/' + date, finished);
  console.log("user end: " + user);
  container = createDiv();
  container.addClass("post");
  container.parent("blogbox");
  post = createP(text);
  post.addClass("postText");
  post.parent(container);
  author = createP("Written by " + user + " on " + date);
  author.addClass("postAuthor");
  author.parent(container);

  document.getElementById("text").value = "";

  function finished(data) {
    console.log(data);
  }
}
