const express = require('express');
const app = express();
const http = require('http');
const Room = require("./Room");
const {GameProvider} = require("./games/GameProvider");
const {DeckGenerator} = require("./DeckGenerator");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});
const roomMap = new Map();
const deckGenerator = new DeckGenerator()
const gameMap = new Map();

server.listen(3003, () => {
    console.log(`Example app listening at http://localhost:${3003}`);
});

io.on('connection', (socket) => {
    socket.on("create room", ({roomId, roomCapacity, game}, callback) => {
        roomMap.set(roomId, new Room(roomId, roomCapacity, game))
        console.log(`Room: ${roomId} has been created, ${roomCapacity}, ${game}`)
        callback("OK")
    })
    socket.on("join room", ({userName, roomId}, callback) => {
        socket.join(roomId)
        socket.roomId = roomId
        const room = roomMap.get(roomId)
        room.addPlayer(socket.id, userName)

        console.log(`User: ${userName} ${socket.id} has joined room: ${roomId}`)

        callback(room.getRoomInfo())
        socket.to(roomId).emit("joinedGame", {players: room.getPlayers()})

        if(room.isFull()) {
            gameMap.set(roomId, new GameProvider(room, io, deckGenerator));
        }
    })

    socket.on("canBeDrawn", ({card}, callback) => {
        console.log(`Can card: {${card.value} ${card.suit}} be drawn`)
        const game = gameMap.get(socket.roomId)
        const wasChosen = game.choseCard(socket.id, card)
        callback(wasChosen)
    })

    socket.on("collect", (_, callback) => {
        console.log(`User: ${socket.id} has collected`)
        const game = gameMap.get(socket.roomId)
        game.collectCards(socket.id)
        callback(true)
    })

    socket.on("layOut", ({cards}, callback) => {
        console.log(`User: ${socket.id} has laid out: ${cards}`)
        const game = gameMap.get(socket.roomId)
        game.layOutCards(socket.id, cards)
        callback(true)
    })
});
