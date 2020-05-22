import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import localforage from "localforage";
import { RootState } from "../../app/rootReducer";
import { setAlarm } from "./anitableSlice";

export interface AniAlarmElemState {
  aniNumber: string;
  aniTitle: string;
  aniDay: number;
  aniTime: string;
}

export interface AniAlarmState {
  loaded: "initial" | "pending" | "fulfilled" | "rejected";
  alarms: AniAlarmElemState[];
}

const initialState: AniAlarmState = {
  loaded: "initial",
  alarms: [],
};

const fetchAniAlarm = createAsyncThunk(
  "anitable/fetchAniAlarm",
  async (dummy, thunkAPI) => {
    const response: AniAlarmElemState[] | null = await localforage.getItem(
      "ani-alarm"
    );
    if (response === null) return [];
    const { anitable } = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setAlarm(response));
    return response;
  }
);

const setAniAlarm = createAsyncThunk(
  "anitable/setAniAlarm",
  async (aniAlarms: AniAlarmElemState[]) => {
    const response = await localforage.setItem("ani-alarm", aniAlarms);
    return response;
  }
);

const aniAlarmSlice = createSlice({
  name: "anialarm",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAniAlarm.fulfilled, (state, action) => {
      state.loaded = "fulfilled";
      state.alarms = action.payload;
    });
    builder.addCase(fetchAniAlarm.pending, (state, action) => {
      state.loaded = "pending";
    });
    builder.addCase(fetchAniAlarm.rejected, (state, action) => {
      state.loaded = "rejected";
    });

    builder.addCase(setAniAlarm.fulfilled, (state, action) => {
      state.loaded = "fulfilled";
      state.alarms = action.payload;
    });
    builder.addCase(setAniAlarm.pending, (state, action) => {
      state.loaded = "pending";
    });
    builder.addCase(setAniAlarm.rejected, (state, action) => {
      state.loaded = "rejected";
    });
  },
});

export { fetchAniAlarm, setAniAlarm };

export default aniAlarmSlice.reducer;
