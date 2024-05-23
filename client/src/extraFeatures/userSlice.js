import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    GetAllUsersRequest: (state) => {
      state.isLoading = true;
    },
    GetAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    },
    GetAllUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { GetAllUsersRequest, GetAllUsersSuccess, GetAllUsersFailure } =
  userSlice.actions;

export default userSlice.reducer;
