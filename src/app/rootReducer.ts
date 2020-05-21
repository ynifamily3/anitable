import { combineReducers } from "redux";
import uiReducer from "../features/ui/uiSlice";
import anitableReducer from "../features/anitable/anitableSlice";
import anialarmReducer from "../features/anitable/anialarmSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  anitable: anitableReducer,
  anialarm: anialarmReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
