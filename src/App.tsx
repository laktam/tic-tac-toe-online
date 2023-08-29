import { Grid } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Box } from "./components/Box";

function App() {
  const [player, setPlayer] = useState(true);
  const [board, setBoard] = useState({
    x1: undefined,
    x2: undefined,
    x3: undefined,
    y1: undefined,
    y2: undefined,
    y3: undefined,
    z1: undefined,
    z2: undefined,
    z3: undefined,
  });

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={0} sm={1.5} md={3} />
        {/*  */}
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />

        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} />
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />

        {/*  */}
        <Grid item xs={0} sm={1.5} md={3} />
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box player={player} setPlayer={setPlayer} />
        </Grid>
        <Grid item xs={0} sm={1.5} md={3} />
      </Grid>
    </div>
  );
}

export default App;
