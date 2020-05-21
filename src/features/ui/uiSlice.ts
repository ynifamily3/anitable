import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  notiGranted: "default" | "granted" | "denied";
}

const initialState: UIState = {
  notiGranted: "default",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotify(state, action): void {
      state.notiGranted = action.payload;
    },
  },
});

export const { setNotify } = uiSlice.actions;

export default uiSlice.reducer;

// thunk reducer
