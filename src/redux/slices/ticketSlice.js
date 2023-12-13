// Dans redux/slices/ticketSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  ticketNumber: "",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,

  reducers: {
    setTicketNumber: (state, action) => {
      state.ticketNumber = action.payload;
    },
  },
});

export const { setTicketNumber } = ticketSlice.actions;
export default ticketSlice.reducer;
