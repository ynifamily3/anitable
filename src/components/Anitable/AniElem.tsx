import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import {
  setAniAlarm,
  AniAlarmElemState,
} from "../../features/anitable/anialarmSlice";

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
  alarm: boolean;
  youbi: number;
}

interface Props2 {
  ani: AniAlarmElemState;
  isOn: boolean;
}

export default function AniElem({ x, isComplete, alarm, youbi }: Props) {
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useDispatch();
  const aniAlarm = useSelector((state: RootState) => state.anialarm);
  const notify = useSelector((state: RootState) => state.ui);
  const [mutAlarm, setMutAlarm] = useState(alarm);

  useEffect(() => {
    setMutAlarm(alarm);
  }, [alarm]);

  useEffect(() => {
    if (aniAlarm.loaded === "fulfilled") {
      setMutAlarm(false);
      for (let i = 0; i < aniAlarm.alarms.length; i++) {
        if (aniAlarm.alarms[i].aniNumber === "" + x.i) {
          setMutAlarm(true);
        }
      }
    }
  }, [aniAlarm]);

  const RenderNotifi = (props: Props2) => {
    return props.isOn ? (
      <Tooltip title="푸쉬 알림 끄기" aria-label="pushNotification">
        <IconButton
          aria-label="turn off Notification"
          disabled={notify.notiGranted !== "granted"}
          onClick={handleAlarmOffClick(props.ani)}
        >
          <NotificationsActiveIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="푸쉬 알림 켜기" aria-label="pushNotification">
        <IconButton
          aria-label="turn on Notification"
          disabled={notify.notiGranted !== "granted"}
          onClick={handleAlarmClick(props.ani)}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImgLoaded(true);
  };
  const handleAlarmClick = (payload: AniAlarmElemState) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(setAniAlarm([...aniAlarm.alarms, payload]));
  };
  const handleAlarmOffClick = (payload: AniAlarmElemState) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // const copyState = [...aniAlarm.alarms];
    // copyState.splice(aniAlarm.alarms.indexOf(payload), 1);
    // dispatch(setAniAlarm(copyState));
    dispatch(
      setAniAlarm(
        aniAlarm.alarms.filter((x) => {
          return x.aniNumber !== payload.aniNumber;
        })
      )
    );
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
              alt={x.t}
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
                <RenderNotifi
                  isOn={mutAlarm}
                  ani={{
                    aniDay: youbi,
                    aniNumber: "" + x.i,
                    aniTitle: x.s,
                    aniTime: x.t,
                  }}
                />
              )}
              <a href={x.l} target="_blank" rel="noopener noreferrer">
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
