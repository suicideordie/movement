var user;
var socket;
var keys;
var keyslen;
var id;

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
    container = createDiv();
    container.addClass("post");
    container.parent("blogbox")
    author = createP(entries[i][1]);
    author.addClass("postText");
    author.parent(container);
    post = createP(entries[i][0]);
    post.addClass("postAuthor");
    post.parent(container);

  }
}

function submitPost() {
  var post;
  var container;
  var author;
  loadJSON('all', incId);
  var text = select('#text').value();

  var date = "1234";


  loadJSON('/add/' + Number(id) + '/' + user + '/' + text + '/' + date, finished);
  container = createDiv();
  container.addClass("post");
  container.parent("blogbox");
  post = createP(text);
  post.addClass("postText");
  post.parent(container);
  author = createP(user);
  author.addClass("postAuthor");
  author.parent(container);

  document.getElementById("text").value = "";

  function finished(data) {
    console.log(data);
  }
}

function incId(data) {
  keys = Object.keys(data);
  keyslen = keys.length;
  console.log("id init: " + id);
  console.log("lunghezza chiave init: " + keyslen);
  if(keyslen > 0) {
    keyslen = keyslen - 1;
    console.log("lunghezza chiave mid: " + keyslen);
    id = Number(keys[keyslen]) + 1;
  } else {
    console.log("else");
    id = 0;
  }
  console.log("id end: " + id);
  console.log("lunghezza chiave end: " + keyslen);
}
