// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port ws://localhost:%d', port);
});

var numUsers = 0;
var players  = {};

io.on('connection', function (socket) {
  numUsers++;

  console.log("User connected ", socket.id);
  socket.emit('connected', {id: socket.id} );

  socket.on('update player', function (data) {
    //console.log("update player ", data);
    players[socket.id] = data; 
     //myLevel.data = data;
     socket.broadcast.emit('update player', data);
  });

  socket.on('disconnect', function () {
    console.log("Disconnecting player " , socket.id);
      delete players[socket.id];
      socket.broadcast.emit('disconnect player', {id: socket.id} );
  });

});
