import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const followOrUnfollowSlice = createSlice({
  name: "followOrUnfollow",
  initialState,
  reducers: {
    followOrUnfollowRequest: (state) => {
      state.isLoading = true;
    },
    followOrUnfollowSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    followOrUnfollowFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  followOrUnfollowRequest,
  followOrUnfollowSuccess,
  followOrUnfollowFailure,
} = followOrUnfollowSlice.actions;

export default followOrUnfollowSlice.reducer;
