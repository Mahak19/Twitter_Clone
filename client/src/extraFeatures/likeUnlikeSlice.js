import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const likeUnlikeSlice = createSlice({
  name: "likeAndUnlike",
  initialState,
  reducers: {
    likeOrUnlikeRequest: (state) => {
      state.isLoading = true;
    },
    likeOrUnlikeSuccess: (state, action) => {
      state.isLoading = false;
      state.likeStatus = action.payload;
    },
    likeOrUnlikeFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { likeOrUnlikeRequest, likeOrUnlikeSuccess, likeOrUnlikeFailure } =
  likeUnlikeSlice.actions;

export default likeUnlikeSlice.reducer;