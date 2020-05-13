import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { fetchAnitable } from "../../features/anitable/anitableSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { Button } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 128,
    },
  })
);

function Anitable() {
  const classes = useStyles();
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
        ani.animations[new Date().getDay()].map((x, order) => {
          return (
            <Grow in={true} key={x.i} timeout={500 + order * 500}>
              <Box m="1rem">
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.cover}
                    image={x.img}
                    title={x.s}
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        {x.s}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Box>
            </Grow>
          );
        })}
    </React.Fragment>
  );
}

export default Anitable;
