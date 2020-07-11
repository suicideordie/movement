if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var socket = require('socket.io');

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3030, () => console.log('listening at 3030'));

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("listening. . .");
}

app.use(express.static('views'));
app.use(express.json({
  limit: '1mb'
}));
