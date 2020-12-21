import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigationSlice",
  initialState: {
    navigationIndex: 0,
  },
  reducers: {
    setNavigationIndex(state, action) {
      state.navigationIndex = action.payload;
    },
  },
});

export const { setNavigationIndex } = navigationSlice.actions;
export default navigationSlice;
