import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";

const appTrigger = () => {
  console.log("Triggering Apps...");
  ReactDOM.render(
    <ReduxProvider store={store}>
      <CssBaseline />
      <App />
    </ReduxProvider>,
    document.getElementById("root")
  );
};

// 서비스워커가 없으면 그냥 앱을 실행
if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") {
  console.log("서비스워커가 지원되지 않습니다.");
  appTrigger();
}

// 서비스워커가 있다면 서비스워커가 준비된 뒤에 앱이 실행될 수 있도록 설정
serviceWorker.register();

export default appTrigger;
