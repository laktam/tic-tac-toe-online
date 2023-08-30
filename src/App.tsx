import { Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "./components/Box";

function App() {
  // const [player, setPlayer] = useState(true);
  const [board, setBoard] = useState([]);
  const [lobby, setLobby] = useState({ p1: "", p2: "", lobbyId: 0 });

  useEffect(() => {
    const p1 = window.prompt("Please enter your username:");
    if (p1)
      setLobby((prev) => ({
        ...prev, // Spread the existing properties
        p1, // Update the player property
      }));
    const p2 = window.prompt("Please enter the other player username:");
    if (p2)
      setLobby((prev) => ({
        ...prev, // Spread the existing properties
        p2, // Update the player property
      }));

    //need to generate unique lobby id for different games
    setLobby((prev) => ({
      ...prev, // Spread the existing properties
      lobbyId: 100, // Update the player property
    }));
    
  }, []);
  return (
    <div className="App">
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
