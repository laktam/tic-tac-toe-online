import styled from "@emotion/styled";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Props = {
  player?: boolean;
  setPlayer?: any;
  index: number;
  canPlay?: boolean;
  setCanPlay?: any;
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
  lobbyId?: number;
  board: string[];
};
export function Box(props: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [state, setState] = useState("");

  const Div = styled.div`
    aspect-ratio: 1/1;
    width: 100%;
    border: 3px solid transparent;

    &:hover {
      border: 3px solid gray;
    }
  `;

  return (
    <Div
      onClick={() => {
        if (props.board[props.index] === undefined || props.board[props.index] === null) {
          if (!isClicked && props.canPlay) {
            setIsClicked(true);
            props.socket?.emit("move", {
              lobbyId: props.lobbyId,
              index: props.index,
            });
            props.setCanPlay(false);
          }
        }
      }}
    >
      {props.board[props.index]}
    </Div>
  );
}
