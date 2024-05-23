import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState,
  reducers: {
    deleteAccountRequest: (state) => {
      state.isLoading = true;
    },
    deleteAccountSuccess: (state, action) => {
      state.isLoading = false;
    },
    deleteAccountFailure: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const {
  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountFailure,
} = deleteAccountSlice.actions;

export default deleteAccountSlice.reducer;