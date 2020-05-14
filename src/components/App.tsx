import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Anitable from "./Anitable/Anitable";
import { Container, useTheme, Tabs, Tab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    width: `20px`,
  },
});

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const [youbi, setYoubi] = useState(new Date().getDay());

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setYoubi(newValue);
  };
  return (
    <Container maxWidth="md">
      <div className="App">
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
        <Tabs
          value={youbi}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab className={classes.tab} label="일" />
          <Tab className={classes.tab} label="월" />
          <Tab className={classes.tab} label="화" />
          <Tab className={classes.tab} label="수" />
          <Tab className={classes.tab} label="목" />
          <Tab className={classes.tab} label="금" />
          <Tab className={classes.tab} label="토" />
          <Tab className={classes.tab} label="기타" />
        </Tabs>
        <Anitable youbi={youbi} />
      </div>
    </Container>
  );
}

export default App;
