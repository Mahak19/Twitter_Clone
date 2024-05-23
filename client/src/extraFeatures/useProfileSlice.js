import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    GetUserProfileRequest: (state) => {
      state.isLoading = true;
    },
    GetUserProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    GetUserProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  GetUserProfileRequest,
  GetUserProfileSuccess,
  GetUserProfileFailure,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;