// databaseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const databaseSlice = createSlice({
  name: "database",
  initialState: {
    dbName: "",
    dbId: "",
  },
  reducers: {
    setDbName: (state, action) => {
      state.dbName = action.payload;
    },
    setDbId: (state, action) => {
      state.dbId = action.payload;
    },
  },
});

export const { setDbName, setDbId } = databaseSlice.actions;
export default databaseSlice.reducer;
