import { Button, Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "./components/Box";
import { io } from "socket.io-client";
import { Invitation } from "./components/Invitation";

const socket = io("http://localhost:3001"); // Replace with your server URL

function App() {
  // const [player, setPlayer] = useState(true);
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
      <button  onClick={invitePlayer}>invite a player</button>
      <Button variant="contained" disabled={false}>Your Turn</Button>

      <Grid container>
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>
        {/*  */}
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={0}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={1}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={2}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>

        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>

        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={3}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={4}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={5}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>


        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>

        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={6}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={7}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1.8}>
          <Box
            board={board}
            lobbyId={lobbyId}
            index={8}
            canPlay={canPlay}
            setCanPlay={setCanPlay}
            socket={socket}
          />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} lg={3.3}/>

      </Grid>
      <Invitation socket={socket} />
    </div>
  );
}

export default App;
