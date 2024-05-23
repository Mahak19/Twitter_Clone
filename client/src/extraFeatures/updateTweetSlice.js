import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const updateTweetSlice = createSlice({
  name: "updateTweet",
  initialState,
  reducers: {
    UpdateTweetRequest: (state) => {
      state.isLoading = true;
    },
    UpdateTweetSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    UpdateTweetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { UpdateTweetRequest, UpdateTweetSuccess, UpdateTweetFailure } =
  updateTweetSlice.actions;

export default updateTweetSlice.reducer;
