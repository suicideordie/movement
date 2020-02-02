var user;
var socket;

function setup() {
  noCanvas();
  console.log("working");
  loadJSON('all', showData);

  var button = select('#submit');
  button.mousePressed(submitPost);

  socket = io.connect();
  // socket.emit('username', data);
  socket.on('username', receiveName);
}

function receiveName(data) {
  user = data;
}

function draw() {

}

function showData(data) {
  var post;
  keys = Object.entries(data);
  console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    post = createP(keys[i]);
  }
}

function submitPost() {

  var text = select('#text').value();
  var i = -1;

  loadJSON('/add/' + user + '/' + text, finished);
  post = createP(text);

  function finished(data) {
    console.log(data);
  }
}
