import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AniTimetableElem as AniTimetableElemType,
  getAniTimetableInfo,
} from "../../api/anitableApi";

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
    //
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

export { fetchAnitable };

export default anitableSlice.reducer;
