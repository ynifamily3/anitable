import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { fetchAnitable } from "../../features/anitable/anitableSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { Button, makeStyles } from "@material-ui/core";
import AniElem from "./AniElem";

interface Props {
  youbi: number;
}

function Anitable(props: Props) {
  const { youbi } = props;
  const ani = useSelector((state: RootState) => state.anitable);
  const dispatch = useDispatch();

  const retryButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(fetchAnitable());
  };

  useEffect(() => {
    dispatch(fetchAnitable());
  }, [dispatch]);
  return (
    <React.Fragment>
      {ani.loaded === "pending" && (
        <Box m="1rem" alignItems="center" textAlign="center">
          <CircularProgress />
          <Typography>로딩 중...</Typography>
        </Box>
      )}
      {ani.loaded === "rejected" && (
        <Box m="1rem" alignItems="center" textAlign="center">
          <CloudOffIcon fontSize="large" />
          <Typography>목록 로딩을 할 수 없었습니다.</Typography>
          <Button size="large" onClick={retryButtonHandler}>
            재시도
          </Button>
        </Box>
      )}
      {ani.loaded === "fulfilled" &&
        ani.animations[youbi].map((x, order) => {
          return <AniElem x={x} key={x.i} isComplete={youbi === 7} />;
        })}
    </React.Fragment>
  );
}

export default Anitable;
