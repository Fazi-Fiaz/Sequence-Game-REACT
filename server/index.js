const express = require('express')
const app = express()
const port = 3001
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const cors = require('cors')

app.use(cors())

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})
let users = []
let rooms = {}
io.on('connection', socket => {
  socket.on('message', data => {
    io.emit('messageResponse', data)
  })

  socket.on('typing', data => socket.broadcast.emit('typingResponse', data))

  socket.on('newUser', data => {
    users.push(data)
    console.log(data)
    io.emit('newUserResponse', users)
  })

  socket.on('joinRoom', data => {
    console.log(data.roomId)
    if (!rooms[data.roomId]) {
      rooms[data.roomId] = []
    }
    rooms[data.roomId].push(data.user.name)
    socket.join(data.roomId)
    io.to(data.roomId).emit('user-update', {
      users: rooms[data.roomId]
    })
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
    users = users.filter(user => user.socketID !== socket.id)
    io.emit('newUserResponse', users)
    socket.disconnect()
  })
})

server.listen(port, () => {
  console.log('listening on *:3001', port)
})
