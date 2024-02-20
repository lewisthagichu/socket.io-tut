const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Set up project to accept cors
app.use(cors());

// Create a http server with express
const server = http.createServer(app);

// Create a socket io instance
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POSt'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', ({ message, room }) => {
    socket.to(room).emit('receive_message', message);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
