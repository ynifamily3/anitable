import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { AniTimetableElem } from "../../api/anitableApi";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    box: {
      marginLeft: 0,
      marginRight: 0,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
    },
    content: {
      flex: "1",
      flexGrow: 1,
      display: "flex",
      width: "100%",
      padding: "24px",
    },
    left: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
    },
    right: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    vec: {},
    cover: {
      width: 128,
    },
    imgWrapper: {
      width: 128,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,.1)",
    },
  })
);

interface Props {
  x: AniTimetableElem;
  isComplete?: boolean; // 완결난 애니 (기타 탭) 인 경우 true
}

export default function AniElem({ x, isComplete }: Props) {
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // alert("Load!");
    setImgLoaded(true);
  };
  return (
    <Box m="1rem" className={classes.box}>
      {!isComplete && (
        <Typography variant="h5">{x.t.replace(/(.{2})/, "$1:")} </Typography>
      )}
      <Card className={classes.root} variant="outlined">
        {x.img && (
          <div className={classes.imgWrapper}>
            <img
              src={x.img}
              className={classes.cover}
              onLoad={handleImageLoad}
              style={!imgLoaded ? { display: "none" } : { display: "inline" }}
            />
            {!imgLoaded && <CircularProgress color="secondary" />}
          </div>
        )}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.left}>
              <Typography component="h5" variant="h5" className={classes.vec}>
                {x.s}
              </Typography>
            </div>
            <div className={classes.right}>
              {!isComplete && (
                <Tooltip title="푸쉬 알림 받기" aria-label="pushNotification">
                  <IconButton aria-label="turn on Notification">
                    {/* <NotificationsIcon /> */}
                    <NotificationsActiveIcon />
                  </IconButton>
                </Tooltip>
              )}
              <a href={x.l} target="_blank" rel="noreferrer">
                <Tooltip title="공식 웹 사이트 가기" aria-label="goOfficial">
                  <IconButton aria-label="open website">
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
}
