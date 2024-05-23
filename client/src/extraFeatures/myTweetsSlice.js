import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const myTweetSlice = createSlice({
  name: "myTweets",
  initialState,
  reducers: {
    GetMyTweetsRequest: (state) => {
      state.isLoading = true;
    },
    GetMyTweetsSuccess: (state, action) => {
      state.isLoading = false;
      state.myTweets = action.payload;
    },
    GetMyTweetsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    NewTweetRequest: (state, action) => {
      state.isLoading = true;
    },
    NewTweetSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    NewTweetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  GetMyTweetsRequest,
  GetMyTweetsSuccess,
  GetMyTweetsFailure,
  NewTweetRequest,
  NewTweetSuccess,
  NewTweetFailure,
} = myTweetSlice.actions;

export default myTweetSlice.reducer;
