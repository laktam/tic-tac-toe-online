const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Add your socket event listeners here
  // For example: socket.on('event', (data) => { ... });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
