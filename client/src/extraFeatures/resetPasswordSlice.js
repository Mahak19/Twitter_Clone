import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const resetPasswordSlice = createSlice({
  name: "reset-password",
  initialState,
  reducers: {
    resetPasswordRequest: (state) => {
      state.isLoading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
