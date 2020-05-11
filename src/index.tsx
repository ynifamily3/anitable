import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import { CssBaseline } from "@material-ui/core";

import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ReduxProvider store={store}>
    <CssBaseline />
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
