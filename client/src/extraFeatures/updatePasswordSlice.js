import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    updatePasswordRequest: (state) => {
      state.isLoading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
} = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;