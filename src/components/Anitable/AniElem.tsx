import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { AniTimetableElem } from "../../api/anitableApi";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
    right: {},
    vec: {},
    cover: {
      width: 128,
    },
  })
);

interface Props {
  x: AniTimetableElem;
}

export default function AniElem({ x }: Props) {
  const classes = useStyles();
  return (
    <Box m="1rem">
      <Typography variant="h5">{x.t.replace(/(.{2})/, "$1:")}</Typography>
      <Card className={classes.root} variant="outlined">
        <CardMedia className={classes.cover} image={x.img} title={x.s} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.left}>
              <Typography component="h5" variant="h5" className={classes.vec}>
                {x.s}
              </Typography>
            </div>
            <div className={classes.right}>
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
