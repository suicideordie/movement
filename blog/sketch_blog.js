var post;
var text;
var socket;

function setup() {
  noCanvas();
  console.log("working");
  loadJSON('all', showData);

  var button = select('#submit');
  button.mousePressed(submitPost);

  // var buttonA = select('#analyze');
  // buttonA.mousePressed(analyzeThis);

  socket = io.connect('http://localhost:8080');
}

function draw() {

}

function showData(data) {
  keys = Object.keys(data);
  console.log(data);
  for(var i = 0; i < keys.length; i++) {
    text = createP(keys[i]);
  }
}

function submitPost() {
  var name = select('#name').value();
  var text = select('#text').value();

  loadJSON('add/' + name + '/' + text, finished);

  function finished(data) {
    console.log(data);
  }
}





























// function analyzeThis() {
//   var txt = select('#textinput').value();
//   var data = {
//     text: txt
//   }
//   httpPost('analyze', data, 'json', dataPosted, postErr);
// }

// function dataPosted(result) {
//   console.log(result);
// }
// //callback for httppost
// function postErr(err){
//   console.log(err);
// }
