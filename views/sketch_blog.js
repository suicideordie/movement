var user;
var socket;

function setup() {
  var data = {
    name: 'we'
  }
  noCanvas();
  console.log("working");
  loadJSON('all', showData);

  var button = select('#submit');
  button.mousePressed(submitPost);

  socket = io.connect('http://localhost:8080');
  socket.emit('username', data);
}

function draw() {

}

function showData(data) {
  keys = Object.keys(data);
  // console.log(data);

  for (var i = 0; i < keys.length; i++) {
    text = createP(keys[i]);
  }
}

function submitPost() {
  // var user = document.getElementById("user").value();
  var text = select('#text').value();
  var i = -1;

  loadJSON('/add/' + user + '/' + text, finished);

  function finished(data) {
    console.log(data);
  }
}
