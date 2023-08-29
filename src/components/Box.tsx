import styled from "@emotion/styled";
import { useState } from "react";

type Props = {
  player?: boolean;
  setPlayer?: any;
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
        if (!isClicked) {
          setIsClicked(true);
          props.setPlayer(!props.player);
          if (props.player) setState("x");
          if (!props.player) setState("o");
        }
      }}
    >
      {state}
    </Div>
  );
}
