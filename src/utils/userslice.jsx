import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isVisible: true,
    isPrVisible: false,
  },
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    clearData: (state, action) => {
      state.data = [];
    },
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setPrIsVisible: (state, action) => {
      state.isPrVisible = action.payload;
    },
  },
});

export const { addData, clearData, setIsVisible, setPrIsVisible } =
  userSlice.actions;
export default userSlice.reducer;
