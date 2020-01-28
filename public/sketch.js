var valueBirth = 0;
var seconds = 0;
var minutes = 1;
var hour = 1;
var buttonJoin;
var randDiv;
// var position;
// var date, hours, minutes, seconds;
// var formattedTime;


// function preload() {
//   position = getCurrentPosition();
// }

function setup() {
  noCanvas();
  buttonJoin = createButton("");
  buttonJoin.class("button");
  buttonJoin.mouseClicked(changePage);
  var firstline = document.getElementById("p01").innerHTML;
  var timePass = function() {
    seconds++;
    if(seconds != 60 && seconds % 60 == 0) {
      minutes++;
    }
    if(seconds <= 59){
      document.getElementById("p01").innerHTML = "IN THE LAST " + seconds + " SECONDS";
    }
    else if(seconds > 59 && seconds <= 119) {
      document.getElementById("p01").innerHTML = "IN THE LAST MINUTE";
    }
    else if(seconds > 119) {
      document.getElementById("p01").innerHTML = "IN THE LAST " + minutes + " MINUTES";
    }
  }
  setInterval(timePass, 1000);
  timePass();
  var birthGrowth = function() {
    valueBirth += (1.075 / 2);
    document.getElementById("counter").innerHTML = round(valueBirth);
    document.getElementById("p02").innerHTML = "PEOPLE ARE BORN.";
  }
  setInterval(birthGrowth, 125);
  birthGrowth();
  // date = new Date(position.timestamp);
  // hours = date.getHours();
  // minutes = date.getMinutes();
  // seconds = date.getSeconds();
}

function changePage() {
  window.open("./home.html", '_self');
}
