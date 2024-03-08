import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "",
    isSelectedDateValid: true,
    clearDateField: "",
    location: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIsSelectedDateValid: (state, action) => {
      state.isSelectedDateValid = action.payload;
    },
    setClearDateField: (state, action) => {
      state.clearDateField = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  setCategory,
  setIsSelectedDateValid,
  setClearDateField,
  setLocation,
} = categorySlice.actions;
export default categorySlice.reducer;
