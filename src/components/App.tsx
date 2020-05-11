import React, { useState, useEffect } from "react";
import { getAniTimetableInfo, AniTimetableElem } from "../api/anitableApi";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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

function App() {
  const classes = useStyles();

  const [ani, setAni] = useState<AniTimetableElem[]>([]);
  useEffect(() => {
    getAniTimetableInfo().then((response) => {
      if (Array.isArray(response)) {
        setAni(response[new Date().getDay()]);
      }
    });
  }, []);
  return (
    <div className="App">
      <Box m="2rem">
        <Typography component="h1" variant="h1">
          오늘의 애니메이션
        </Typography>
      </Box>
      {ani.map((x, i) => {
        return (
          <Box m="1rem" key={i}>
            <Card className={classes.root}>
              <CardMedia className={classes.cover} image={x.img} title={x.s} />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {x.s}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Box>
        );
      })}
    </div>
  );
}

export default App;
