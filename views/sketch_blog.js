var user;
var socket;

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
  keys = Object.entries(data);
  console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    container = createDiv();
    container.addClass("post");
    container.parent("blogbox")
    author = createP(keys[i][1]);
    author.addClass("postText");
    author.parent(container);
    post = createP(keys[i][0]);
    post.addClass("postAuthor");
    post.parent(container);

  }
}

function submitPost() {
  var post;
  var container;
  var author;

  var text = select('#text').value();
  var i = -1;

  // loadJSON('/add/' + user + '/' + text, finished);
  loadJSON('/add/' + id + '/' + user + '/' + text + '/' + date, finished);

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
