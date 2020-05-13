import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Anitable from "../components/Anitable";

function App() {
  return (
    <div className="App">
      <Box m="2rem">
        <Typography component="h2" variant="h2">
          오늘의 애니메이션
        </Typography>
      </Box>
      <Anitable />
    </div>
  );
}

export default App;
