import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { logoutRequest, logoutSuccess, logoutFailure } =
  logoutSlice.actions;

export default logoutSlice.reducer;