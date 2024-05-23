import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    TweetsOfFollowingsRequest: (state) => {
      state.isLoading = true;
    },
    TweetsOfFollowingsSuccess: (state, action) => {
      state.isLoading = false;
      state.tweet = action.payload;
    },
    TweetsOfFollowingsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  TweetsOfFollowingsRequest,
  TweetsOfFollowingsSuccess,
  TweetsOfFollowingsFailure,
  clearErrors,
} = tweetSlice.actions;

export default tweetSlice.reducer;
