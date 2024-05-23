import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const newTweetSlice = createSlice({
  name: "newTweet",
  initialState,
  reducers: {
    NewTweetRequest: (state) => {
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

export const { NewTweetRequest, NewTweetSuccess, NewTweetFailure } =
  newTweetSlice.actions;

export default newTweetSlice.reducer;
