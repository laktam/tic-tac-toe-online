import { Button, Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "./components/Box";
import { io } from "socket.io-client";
import { Invitation } from "./components/Invitation";
import Board from "../src/images/CropedCleanedBoard.png";

const socket = io("http://localhost:3001"); // Replace with your server URL

function App() {
  // const [player, setPlayer] = useState(true);
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState("");
  const [other, setOther] = useState("");
  const [lobbyId, setLobbyId] = useState();
  //
  const [canPlay, setCanPlay] = useState(false);
  //always change it to false after playing,
  // and test if it's true before allowing actin
  useEffect(() => {
    //get id from server
    socket.on("id", (data) => {
      console.log("Received id:", data);
      setPlayer(data);
    });

    socket.on("canPlay", () => {
      console.log("can Play Received");
      setCanPlay(true);
    });
    socket.on("lobbyId", (data) => {
      console.log("Received Lobby id:", data);
      setLobbyId(data);
    });
    socket.on("board", (board) => {
      console.log("board received :", board);
      setBoard(board);
    });
  }, []);

  const invitePlayer = () => {
    const p2 = window.prompt("Please enter player id:");
    if (p2) setOther(p2);
    socket.emit("invitePlayer", { p1: player, p2: p2 });
  };

  return (
    <div className="App">
      <div style={{ margin: "4px" }}>
        <Button onClick={invitePlayer}>invite a player</Button>
        <Button
          style={{ marginLeft: "5px" }}
          variant="contained"
          disabled={!canPlay}
        >
          Your Turn
        </Button>
      </div>
      <Grid container>
        <Grid item container xs sm></Grid>
        <Grid
          item
          container
          xs={12}
          sm={7}
          md={4.5}
          style={{
            backgroundImage: `url(${Board})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {arr.map((item) => {
            return (
              <Grid
                key={item}
                item
                xs={4}
              >
                <Box
                  board={board}
                  lobbyId={lobbyId}
                  index={item}
                  canPlay={canPlay}
                  setCanPlay={setCanPlay}
                  socket={socket}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item container xs sm></Grid>
      </Grid>

      <Invitation socket={socket} />
    </div>
  );
}

export default App;
