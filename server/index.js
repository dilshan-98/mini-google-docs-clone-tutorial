
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);

io.on('connection', function (socket) {
    socket.on("new-operations", function (data) {
        io.emit("new-remote-operations", data);
    })
});

http.listen(4000, function () {
    console.log('listening on port 4000');
});