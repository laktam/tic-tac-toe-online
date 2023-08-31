import styled from "@emotion/styled";
import { Alert, Paper } from "@mui/material";

const Div = styled.div`
  //   background-color: #d3d3d350;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  start: boolean;
};
export function BackDrop(props: Props) {
  if (props.start) return <></>;
  else {
    return (
      <Div>
        <Paper elevation={8}>
          <Alert severity="info">Invite a friend to start a game!</Alert>
        </Paper>
      </Div>
    );
  }
}
