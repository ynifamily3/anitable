import { combineReducers } from "redux";
import uiReducer from "../features/ui/uiSlice";
import anitableReducer from "../features/anitable/anitableSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  anitable: anitableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
