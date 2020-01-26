var pos = 0;
var posRev;

var myCutout = document.getElementById("cutout");

function preload() {}

function mouseWheel(event) {
  //println(event.delta);
  pos += event.delta;
  if (pos < 0) {
    pos = 0;
  }
  posRev = height - 10 - pos;
}


function setup() {

}

function draw() {
  if (pos > 1100) {
    document.getElementById("cutout").classList.add("test");
    document.getElementById("cutout").style.transform = "scale(" + (pos-1100)*0.06 +"," + (pos-1100)*0.06 +")";
  }else{
    document.getElementById("cutout").classList.remove("test");
  }

  if(pos> 3000){
    document.body.classList.add("myBackground-2")
    document.body.classList.remove("myBackground");
  }else{
    document.body.classList.add("myBackground")
    document.body.classList.remove("myBackground-2");
  }
}
