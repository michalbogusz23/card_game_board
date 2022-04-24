const express = require('express');
const app = express();
const http = require('http');
const Room = require("./Room");
const Player = require("./Player");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});
const roomList = new Map();

app.get('/', (req, res) => {
    res.send('Hello WorldDupa!')
})

server.listen(3003, () => {
    console.log(`Example app listening at http://localhost:${3003}`);
});

io.on('connection', (socket) => {
    socket.on('connection', () => {
        console.log('dupa')
    })
    socket.on("create room", (roomId, roomCapacity) => {
        roomList.set(roomId, new Room(roomId, roomCapacity, io))
        console.log(`Room: ${roomId} has been created`)
    })
    socket.on("join room", (userName, roomId) => {
        socket.join(roomId)
        roomList.get(roomId).addPlayer(new Player(socket.id, userName))
        console.log(`User: ${userName} has joined room: ${roomId}`)
    })
});
