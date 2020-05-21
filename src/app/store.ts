import { ThunkAction } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";
import { configureStore, Action } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
