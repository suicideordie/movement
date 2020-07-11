var socket;
var database;
var logoutBtn;
var postbutton;
var container;
var post;
var user;
var date;
var author;
var text;
var lastMSG = null;

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

  keyCheck();

  logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", e => {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    } else {
      window.location.href = "/login.html";
    }
  });

  postbutton = document.getElementById("postbutton");

  postbutton.addEventListener("click", e => {

    text = document.getElementById("text").value; //TODO evitare messaggi vuoti

    console.log(lastMSG);
    //TODO: creare array: testo+autore+data
    var ref = database.ref("/messaggi");
    ref.on('value', gotMSG, errMSG);
    var insertMSG = ref.child(lastMSG.toString()).set(text); //TODO sostituire text con array

    //TODO creare array, leggere array, scrivere dati array nei messaggi e riscrivere ogni volta la "cronologia" dei messaggi


    container = createDiv();
    container.addClass("post");
    container.parent("blogbox");
    post = createP(text);
    post.addClass("postText");
    post.parent(container);
    author = createP("Written by " + user + " on " + date);
    author.addClass("postAuthor");
    author.parent(container);

    document.getElementById("text").value = "";
  });

  function gotMSG(data) {
    console.log(Object.keys(data));
    lastMSG = Object.keys(data.val()).length;
  }

  function errMSG(err) {
    console.log('Error: ' + err);
  }
}

function keyCheck(){
  var ref = database.ref("/messaggi");
  ref.on('value', gotMSG, errMSG);

  //retrieve last key to increase database
  function gotMSG(data) {
    if (lastMSG == null) {
      lastMSG = 0;
    } else {
      // console.log(Object.keys(data.val()));
      lastMSG = Object.keys(data.val()).length;
    }
  }

  function errMSG(err) {
    console.log('Error: ' + err);
  }
}
