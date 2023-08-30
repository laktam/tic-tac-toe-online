import { Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "./components/Box";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

function App() {
  // const [player, setPlayer] = useState(true);
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState("");
  const [other, setOther] = useState("");
  const [lobbyId, setLobbyId] = useState();
  useEffect(() => {
    //get id from server
    socket.on("id", (data) => {
      console.log("Received id:", data);
      setPlayer(data);
    });

    socket.on("lobbyId", (data) => {
      console.log("Received Lobby id:", data);
      setLobbyId(data);
    });

    // socket.on("invitation", (data) => {
    //   console.log("invitation from ", data);
    // });
    //   setLobby((prev) => ({
    //     ...prev, // Spread the existing properties
    //     p1: p1, // Update the player property
    //   }));
    //need to generate unique lobby id for different games
    // setLobby((prev) => ({
    //   ...prev, // Spread the existing properties
    //   id: 100, // Update the player property
    // }));
    //send lobby data to server
    //change this to make first player invite second player
    //then create the lobby if he accepts
    // socket.emit("createLobby", { p1, p2, id: 100 });
  }, []);

  const invitePlayer = () => {
    const p2 = window.prompt("Please enter player id:");
    if (p2) setOther(p2);
    socket.emit("invitePlayer", { p1: player, p2: p2 });
  };

  return (
    <div className="App">
      <button onClick={invitePlayer}>invite a player</button>
      <Grid container>
        <Grid item xs={0} sm={1.5} md={3} />
        {/*  */}
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />

        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} />
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />

        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} />
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />
      </Grid>
    </div>
  );
}

export default App;
