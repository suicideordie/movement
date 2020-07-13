var pos = 0;
var posRev;

var myCutout = document.getElementById("cutout");

function preload() {}

// function mouseWheel(event) {
//   //println(event.delta);
//   pos += event.delta;
//   if (pos < 0) {
//     pos = 0;
//   }
//   posRev = height - 10 - pos;
// }


function setup() {
  noCanvas();
}

function draw() {
  pos = document.body.scrollTop;


  if (pos <= 950) {
    document.getElementById("cutout").classList.add("beforeEnlarge");
    document.getElementById("cutout").classList.remove("afterEnlarge");
    document.getElementById("cutout").style.transform = "scale(1,1)";

  } else if (pos > 950 && pos <= 1310) {
    document.getElementById("cutout").classList.add("afterEnlarge");
    document.getElementById("cutout").classList.remove("beforeEnlarge");
    document.getElementById("cutout").style.transform = "scale(" + ((pow((pos - 950), 2) * 0.001) + 1) + "," + ((pow((pos - 950), 2) * 0.001) + 1) + ")";

    document.body.classList.add("myBackground");
    document.body.classList.remove("myBackground-2");
    document.getElementById("cutout").classList.remove("hiddenElement");

  } else if (pos > 1310) {
    document.body.classList.add("myBackground-2");
    document.body.classList.remove("myBackground");
    document.getElementById("cutout").classList.add("hiddenElement");

    document.getElementById("hiddenText").classList.remove("hiddenElement");

  }

}
