import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userTweetsSlice = createSlice({
  name: "userTweets",
  initialState,
  reducers: {
    GetUserTweetsRequest: (state) => {
      state.isLoading = true;
    },
    GetUserTweetsSuccess: (state, action) => {
      state.isLoading = false;
      state.tweets = action.payload;
    },
    GetUserTweetsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  GetUserTweetsRequest,
  GetUserTweetsSuccess,
  GetUserTweetsFailure,
} = userTweetsSlice.actions;

export default userTweetsSlice.reducer;