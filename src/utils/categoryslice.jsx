import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "",
    isSelectedDateValid: true,
    clearDateField: "",
    location_pincode: "",
    location_post: "",
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
    setLocationPincode: (state, action) => {
      state.location_pincode = action.payload;
    },
    setLocationPost: (state, action) => {
      state.location_post = action.payload;
    },
  },
});

export const {
  setCategory,
  setIsSelectedDateValid,
  setClearDateField,
  setLocationPincode,
  setLocationPost,
} = categorySlice.actions;
export default categorySlice.reducer;
