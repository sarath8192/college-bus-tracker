import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
  name: "bus",

  initialState: {
    buses: [],
  },

  reducers: {
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
  },
});

export const { setBuses } =
  busSlice.actions;

export default busSlice.reducer;