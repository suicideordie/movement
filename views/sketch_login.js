var socket;
var database;
var user;
var pwd;
var email;
var registerBtn;
var loginBtn;

function preload(){

}

function setup(){
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
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log(database);

  var textUser = document.getElementById("user");
  var txtEmail = document.getElementById("email");
  var txtPwd = document.getElementById("password");
  registerBtn = document.getElementById("registerBtn");
  loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener('click', e => {
    email = txtEmail.value;
    pwd = txtPwd.value;
    var auth = firebase.auth();

    var promise = auth.signInWithEmailAndPassword(email, pwd);
    promise.catch(e => console.log(e.message));
  });

  registerBtn.addEventListener('click', e => {
    email = txtEmail.value;
    pwd = txtPwd.value;
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, pwd);
    promise.catch(e => console.log(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      window.location.href = "/index_blog.html";
    } else {
      console.log("not logged in");
    }
  });

}

// function register() {
//   user = getElementById("user").value;
//   email = getElementById("email").value;
//   pwd = getElementById("password").value;
//   var userDataArray = [user, mail, pwd];
//   console.log(userDataArray);
//   var ref = database.ref(0);
//   ref.on('value', gotUser, errUser);
//   var insertUser = ref.child(1).set(userDataArray);
// }
