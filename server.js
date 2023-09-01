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
let lobbyId = 1;
const games = {};
// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected :", socket.id);
  socket.emit("id", socket.id);

  /////////////////////////////////////////////////////////////
  function sendBoardState(game) {
    io.to(game.p1).emit(`board`, game.board);
    io.to(game.p2).emit(`board`, game.board);
  }
  /////////////////////////////////////////////////////////////

  //invite a player
  // let lobbyData = {};
  socket.on("invitePlayer", (data) => {
    console.log(`player ${data.p1} invited ${data.p2}`);
    // lobbyData.p1 = data.p1;
    // lobbyData.p2 = data.p2;
    // console.log("lobby data : ", lobbyData);
    io.to(data.p2).emit(`invitation`, { p1: data.p1, p2: data.p2 });
  });

  socket.on("createLobby", (lobbyData) => {
    // console.log("Lobby info: ", lobby);
    console.log("lobby data from second player: ", lobbyData);
    games[lobbyId] = { p1: lobbyData.p1, p2: lobbyData.p2, board: [] };
    console.log("Games ", games);
    socket.emit("lobbyId", lobbyId);
    io.to(lobbyData.p1).emit(`lobbyId`, lobbyId);

    lobbyId++;
    //starting the game
    const startPlayer = Math.round(Math.random());
    if (startPlayer === 0) {
      io.to(lobbyData.p1).emit(`canPlay`);
    } else {
      io.to(lobbyData.p2).emit(`canPlay`);
    }
  });
  // Games  {
  //   '0': { p1: 'f5bl4ECQQ-TDIjflAAAD', p2: 'G4Y5qsggclsp_kMRAAAC', board: [] }
  // }
  socket.on("move", (data) => {
    console.log("data on move ", data);
    if (socket.id === games[data.lobbyId].p1) {
      //if the current player is the first player Play X
      games[data.lobbyId].board[data.index] = "X";
      sendBoardState(games[data.lobbyId]);
      //allow other player to move
      io.to(games[data.lobbyId].p2).emit(`canPlay`);
    } else if (socket.id === games[data.lobbyId].p2) {
      games[data.lobbyId].board[data.index] = "O";
      sendBoardState(games[data.lobbyId]);
      //allow other player to move
      io.to(games[data.lobbyId].p1).emit(`canPlay`);
    }

    //winning test
    if (
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[1] +
        games[data.lobbyId].board[2] ===
        "XXX" ||
      games[data.lobbyId].board[3] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[5] ===
        "XXX" ||
      games[data.lobbyId].board[6] +
        games[data.lobbyId].board[7] +
        games[data.lobbyId].board[8] ===
        "XXX" ||
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[3] +
        games[data.lobbyId].board[6] ===
        "XXX" ||
      games[data.lobbyId].board[1] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[7] ===
        "XXX" ||
      games[data.lobbyId].board[2] +
        games[data.lobbyId].board[5] +
        games[data.lobbyId].board[8] ===
        "XXX" ||
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[8] ===
        "XXX" ||
      games[data.lobbyId].board[2] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[6] ===
        "XXX"
    ) {
      io.to(games[data.lobbyId].p1).emit(`win`);
      io.to(games[data.lobbyId].p2).emit(`lose`);
      games[data.lobbyId].board = [];
    } else if (
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[1] +
        games[data.lobbyId].board[2] ===
        "OOO" ||
      games[data.lobbyId].board[3] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[5] ===
        "OOO" ||
      games[data.lobbyId].board[6] +
        games[data.lobbyId].board[7] +
        games[data.lobbyId].board[8] ===
        "OOO" ||
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[3] +
        games[data.lobbyId].board[6] ===
        "OOO" ||
      games[data.lobbyId].board[1] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[7] ===
        "OOO" ||
      games[data.lobbyId].board[2] +
        games[data.lobbyId].board[5] +
        games[data.lobbyId].board[8] ===
        "OOO" ||
      games[data.lobbyId].board[0] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[8] ===
        "OOO" ||
      games[data.lobbyId].board[2] +
        games[data.lobbyId].board[4] +
        games[data.lobbyId].board[6] ===
        "OOO"
    ) {
      io.to(games[data.lobbyId].p2).emit(`win`);
      io.to(games[data.lobbyId].p1).emit(`lose`);
      games[data.lobbyId].board = [];
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
