import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  counter: number;
}

const initialState: UIState = {
  counter: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCounter(state, action: PayloadAction<number>): void {
      state.counter = action.payload;
    },
  },
});

export const { setCounter } = uiSlice.actions;

export default uiSlice.reducer;

// thunk reducer
