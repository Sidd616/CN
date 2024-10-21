const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for 'send message' from a client
    socket.on('send message', (chat) => {
        // Attach the sender's socket ID to the message
        chat.id = socket.id;
        
        // Emit the message to all clients
        io.emit('rec message', chat); 
    });

    // Log disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
