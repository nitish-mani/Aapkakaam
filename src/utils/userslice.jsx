import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isVisibleUser: true,
    isPrVisibleUser: false,
  },
  reducers: {
    addDataUser: (state, action) => {
      state.data[0] = action.payload;
    },
    clearDataUser: (state, action) => {
      state.data = [];
    },
    setIsVisibleUser: (state, action) => {
      state.isVisibleUser = action.payload;
    },
    setPrIsVisibleUser: (state, action) => {
      state.isPrVisibleUser = action.payload;
    },
  },
});

export const {
  addDataUser,
  clearDataUser,
  setIsVisibleUser,
  setPrIsVisibleUser,
} = userSlice.actions;
export default userSlice.reducer;
