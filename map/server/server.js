const server = require('socket.io')(3000);


server.on("connection", function(socket){
    socket.emit("connection-success", "connected to server");

    socket.on("updated", function(data){
        console.log(data);
        socket.broadcast.emit("updated", data);
    })
});

