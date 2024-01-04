import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
  },
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    clearData: (state, action) => {
      state.data = [];
    },
  },
});

export const { addData, clearData } = userSlice.actions;
export default userSlice.reducer;
