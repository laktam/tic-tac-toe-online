const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this to match your client's domain
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3001;
const games = {};
// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected :", socket.id);
  socket.emit("id", socket.id);

  //invite a player
  socket.on("invitePlayer", (data) => {
    console.log(`player ${data.p1} invited ${data.p2}`);
    io.to(data.p2).emit(`invitation`, data.p1);
  });

  socket.on("createLobby", (lobby) => {
    console.log("Lobby info: ", lobby);
    games[lobby.id] = { p1: lobby.p1, p2: lobby.p2, board: [] };
    console.log("Games ", games);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
