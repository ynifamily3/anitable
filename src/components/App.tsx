import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Anitable from "./Anitable/Anitable";
import { useDispatch } from "react-redux";
import { setNotify } from "../features/ui/uiSlice";

import {
  Container,
  useTheme,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
  },
  cont: { height: "100%" },
  gnb: {},
  scrollBox: {
    flex: 1,
    height: 0,
    overflow: "scroll",
  },
});

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const youbis = ["일", "월", "화", "수", "목", "금", "토", "기타"];
  const today = new Date().getDay();
  const [youbi, setYoubi] = useState(today);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setYoubi(newValue);
  };

  useEffect(() => {
    const isNotificationSupported = "Notification" in window;
    function gr(result: "default" | "granted" | "denied") {
      if (result === "granted") {
        console.log("[Notification] 허용: ", result);
        dispatch(setNotify(result));
      } else {
        console.log("[Notification] 차단: ", result);
        dispatch(setNotify(result));
      }
    }
    if (isNotificationSupported) {
      try {
        Notification.requestPermission().then(gr);
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission(gr);
        }
      }
    }
  }, []);

  return (
    <Container maxWidth="md" className={classes.cont}>
      <div className={classes.root}>
        <div className={classes.gnb}>
          <Box m="2rem">
            <Typography
              component={matches ? "h2" : "h3"}
              variant={matches ? "h2" : "h3"}
              align="center"
              noWrap={true}
            >
              <Box fontWeight={200}>애니메이션 편성표</Box>
            </Typography>
          </Box>
          <AppBar position="static" color="default">
            <Tabs
              value={youbi}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs aniyoubi"
            >
              {youbis.map((label, i) => {
                return (
                  <Tab
                    label={label + (i === today ? "(오늘)" : "")}
                    key={label}
                  />
                );
              })}
            </Tabs>
          </AppBar>
        </div>
        <Box className={classes.scrollBox}>
          <Anitable youbi={youbi} />
        </Box>
      </div>
    </Container>
  );
}

export default App;
