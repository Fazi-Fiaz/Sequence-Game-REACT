const express = require('express');
const app = express();
const port = 3001;
const http = require('http');
const server = http.createServer(app);
const socket = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on('connection', (socket) => {
    console.log("Connection with other ", socket.id)
    socket.on('reqTurn', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('playerTurn', data)
    })

    socket.on('create', room => {
        socket.join(room)
    })

    socket.on('join', room => {
        socket.join(room)
        io.to(room).emit('opponent_joined')
    })

    socket.on('reqRestart', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('restart')
    })
});
// io.on("connection", (socket) => {
//     console.log("Connection with other ", socket.id)
// })
server.listen(port, () => {
    console.log('listening on *:3000', port);
});