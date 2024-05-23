import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const updateSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateProfileRequest: (state) => {
      state.isLoading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = updateSlice.actions;

export default updateSlice.reducer;