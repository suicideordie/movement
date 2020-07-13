var valueBirth = 0;
var seconds = 0;
var minutes = 1;
var hour = 1;
var buttonJoin;
var randDiv;
var socket;
// var position;
// var date, hours, minutes, seconds;
// var formattedTime;


// function preload() {
//   position = getCurrentPosition();
// }


function setup() {
  socket = io();

  noCanvas();
  buttonJoin = createButton("JOIN US");
  buttonJoin.class("button");
  buttonJoin.mouseClicked(changePage);

  valueBirth = (hour()*3600 + minute()*60 + second())*4.3;
  var birthGrowth = function() {
    valueBirth += 1.1;
    document.getElementById("counter").innerHTML = round(valueBirth);
  }
  setInterval(birthGrowth, 250);
  birthGrowth();
  // date = new Date(position.timestamp);
  // hours = date.getHours();
  // minutes = date.getMinutes();
  // seconds = date.getSeconds();
}


function changePage() {
  window.open("./home.html", '_self');
}
