const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    app.use(express.static(__dirname + '/public'));
    res.sendFile(join(__dirname, '/public/index.html'))
})

io.on('connection', socket => {
    console.log('user connected: ' + socket.id)
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
    })
    socket.on('message', (message) => {
        console.log(`message from ${socket.id}: ${message}`)
        io.emit('userMessage', message)
    })
})

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})



