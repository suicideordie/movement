var socket;
var database;
var logoutBtn;
var postbutton;
// var container;
var post;
var user;
var userData;
var date;
var userData;
var author;
var text;
var textData;
var timestamp;
var timestampData;
var lastMSG = null;
var arrayMSG;
var contatore = 0;

function setup() {
  noCanvas();

  //connection client-side to server
  socket = io();

  var firebaseConfig = {
    apiKey: "AIzaSyB3HuTDKr6wh9BcQl-SmoQuDXzz-IeHCo4",
    authDomain: "suicideordie-e2766.firebaseapp.com",
    databaseURL: "https://suicideordie-e2766.firebaseio.com",
    projectId: "suicideordie-e2766",
    storageBucket: "suicideordie-e2766.appspot.com",
    messagingSenderId: "762086184061",
    appId: "1:762086184061:web:52f6bad60b6bdcb2d5cd14",
    measurementId: "G-6B20PKQEJ9"
  };


  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
  console.log(database);

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      window.location.href = "/login.html";
    }
  });

  // keyCheck();

  logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", e => {
    firebase.auth().signOut();
  });

  showAllMsg();

  postbutton = document.getElementById("postbutton");

  postbutton.addEventListener("click", e => {
    console.log(document.getElementById("text").value);
    if (document.getElementById("text").value != "") { //Evita l'invio di messaggi vuoti
      text = document.getElementById("text").value;

      console.log(lastMSG);
      var usermail = firebase.auth().currentUser.email;
      var tempArray = usermail.split('@');
      user = tempArray[0];
      var h = hour();
      var min = minute();
      var d = day();
      var m = month();
      var y = year();
      timestamp = d + "." + m + "." + y + " " + h + ":" + min;
      arrayMSG = [text, user, timestamp];
      var ref = database.ref("messaggi");
      var readMsgListener = ref.on('value', gotMSG, errMSG);
      var insertMSG = ref.child(lastMSG.toString()).set(arrayMSG);
      // window.location.reload();
      //TODO scrivere dati array nei messaggi e riscrivere ogni volta la "cronologia" dei messaggi
    }
  });

  function gotMSG(data) {
    console.log(Object.keys(data));
    lastMSG = Object.keys(data.val()).length;
  }

  function errMSG(err) {
    console.log('Error: ' + err);
  }
}

// function keyCheck(){
//   var ref = database.ref("/messaggi");
//   var keyCheckListener = ref.on('value', checkMSG, errorMSG);
// }
//   //retrieve last key to increase database
//   function checkMSG(data) {
//     if (lastMSG == null) {
//       lastMSG = 0;
//     } else {
//       // console.log(Object.keys(data.val()));
//       lastMSG = Object.keys(data.val()).length;
//     }
//
//   }
//
//   function errorMSG(err) {
//     console.log('Error: ' + err);
//   }



function showAllMsg() {
  var ref = database.ref();
  ref.on('value', gotData, errData);
}

function gotData(data) {
  lastMSG = Object.keys(data.val()["messaggi"]).length;
  console.log(lastMSG);

  if (contatore == 0) {
    for (var i = 0; i < lastMSG; i++) {
      textData = data.val()["messaggi"][i][0];
      userData = data.val()["messaggi"][i][1];
      timestampData = data.val()["messaggi"][i][2];

      var container = document.createElement("div");
      container.classList.add("post");
      container.id = "post" + i;
      var blogbox = document.getElementById("blogbox");
      if (i == 0) {
        blogbox.appendChild(container);
      } else {
        var prev = document.getElementById("post" + (i - 1));
        blogbox.insertBefore(container, prev);
      }

      post = createP(textData);
      post.addClass("postText");
      post.parent(container);
      author = createP("Written by " + userData + " on " + timestampData);
      author.addClass("postAuthor");
      author.parent(container);
    }

    contatore++;

  } else {
    for (var i = 0; i < lastMSG-1; i++) {
      console.log(i);
      var div = document.getElementById("post" + i);
      div.remove();
    }

    for (var i = 0; i < lastMSG; i++) {
      textData = data.val()["messaggi"][i][0];
      userData = data.val()["messaggi"][i][1];
      timestampData = data.val()["messaggi"][i][2];

      var container = document.createElement("div");
      container.classList.add("post");
      container.id = "post" + i;
      var blogbox = document.getElementById("blogbox");
      if (i == 0) {
        blogbox.appendChild(container);
      } else {
        var prev = document.getElementById("post" + (i - 1));
        blogbox.insertBefore(container, prev);
      }

      post = createP(textData);
      post.addClass("postText");
      post.parent(container);
      author = createP("Written by " + userData + " on " + timestampData);
      author.addClass("postAuthor");
      author.parent(container);
    }
    document.getElementById("text").value = "";
  }
}

function errData(err) {
  console.log('Error: ' + err);

}
