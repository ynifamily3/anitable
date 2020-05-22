import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AniTimetableElem as AniTimetableElemType,
  getAniTimetableInfo,
} from "../../api/anitableApi";
import { AniAlarmElemState, AniAlarmState } from "./anialarmSlice";
import { fetchAniAlarm } from "../../features/anitable/anialarmSlice";
export interface AnitableState {
  loaded: "initial" | "pending" | "fulfilled" | "rejected";
  animations: AniTimetableElemType[][];
}

const initialState: AnitableState = {
  loaded: "initial",
  animations: [],
};

const fetchAnitable = createAsyncThunk("anitable/fetchAnitable", async () => {
  const response = await getAniTimetableInfo();
  return response.json();
});

const anitableSlice = createSlice({
  name: "anitable",
  initialState,
  reducers: {
    setAlarm: (state, action: PayloadAction<AniAlarmElemState[]>) => {
      // action.payload정보를 이용해서 alarm 정보를 set한다.
      if (state.loaded !== "fulfilled") {
        console.log("애니 정보가 로드되지 않음.");
        return;
      }
      const alarms = action.payload;
      for (let i = 0; i < state.animations.length; i++) {
        for (let j = 0; j < state.animations[i].length; j++) {
          const current = "" + state.animations[i][j].i;
          alarms.forEach((x) => {
            if (x.aniNumber === current) {
              state.animations[i][j].alarm = true;
            }
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnitable.fulfilled, (state, action) => {
      state.loaded = "fulfilled";
      state.animations = action.payload;
    });
    builder.addCase(fetchAnitable.pending, (state, action) => {
      state.loaded = "pending";
    });
    builder.addCase(fetchAnitable.rejected, (state, action) => {
      state.loaded = "rejected";
    });
  },
});

export const { setAlarm } = anitableSlice.actions;

export { fetchAnitable };

export default anitableSlice.reducer;
