import { combineReducers } from "redux";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
