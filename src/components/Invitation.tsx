import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Props = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

export function Invitation(props: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ p1: "", p2: "" });
  useEffect(() => {
    props.socket.on("invitation", (data) => {
      console.log("invitation from ", data.p1);
      setData(data);
      setOpen(true);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = () => {
    props.socket.emit("createLobby", data);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Invitation to a game lobby"}
      </DialogTitle>
      {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent> */}
      <DialogActions>
        <Button onClick={handleClose}>Decline</Button>
        <Button onClick={handleAccept} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
