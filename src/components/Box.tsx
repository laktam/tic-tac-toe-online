import styled from "@emotion/styled";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import X from "../images/X.png";
import O from "../images/O.png";
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
    box-sizing: border-box;
    aspect-ratio: 1/1;
    width: 100%;
    border: 5px solid transparent;
    // padding: 5px;
    &:hover {
      // border: 5px solid #7895CB;
      background-color: rgba(0, 255, 0, 0.2);
    }
  `;
  const Outer = styled.div`
    padding: 18px;
    &:hover {
      background-color: rgba(0, 255, 0, 0.2);
    }
  `;

  return (
    <Outer>
      <Div
        style={{
          backgroundImage:
            props.board[props.index] === "X"
              ? `url(${X})`
              : props.board[props.index] === "O"
              ? `url(${O})`
              : "",

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => {
          if (
            props.board[props.index] === undefined ||
            props.board[props.index] === null
          ) {
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
      ></Div>
    </Outer>
  );
}
