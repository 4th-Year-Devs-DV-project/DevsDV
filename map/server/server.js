/**
 * A server to used websockets
 */

const server = require('socket.io')(3000);


server.on("connection", function(socket){
    socket.emit("connection-success", "connected to server");

    socket.on("subscribe-car", function(id){    
        console.log("car : " + id + "attempt to connect");    
        socket.broadcast.emit("subscribe", id);
    }); 

    socket.on("update-car", function(data){
        console.log(data);
        socket.broadcast.emit("update", data);
    })
});

