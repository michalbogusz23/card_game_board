const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('Hello WorldDupa!')
})

server.listen(3003, () => {
    console.log(`Example app listening at http://localhost:${3003}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
