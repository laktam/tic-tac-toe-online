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
let lobbyId = 0;
const games = {};
// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected :", socket.id);
  socket.emit("id", socket.id);

  //invite a player
  let lobbyData = {};
  socket.on("invitePlayer", (data) => {
    console.log(`player ${data.p1} invited ${data.p2}`);
    lobbyData.p1 = data.p1;
    lobbyData.p2 = data.p2;
    console.log("lobby data : ", lobbyData);
    io.to(data.p2).emit(`invitation`, { p1: data.p1, p2: data.p2 });
  });

  socket.on("createLobby", (lobby) => {
    // console.log("Lobby info: ", lobby);
    games[lobbyId] = { p1: lobbyData.p1, p2: lobbyData.p2, board: [] };
    console.log("Games ", games);
    socket.emit("lobbyId", lobbyId);
    io.to(lobbyData.p1).emit(`lobbyId`, lobbyId);

    lobbyId++;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
