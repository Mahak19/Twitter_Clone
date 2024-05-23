import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginUserRequest: (state) => {
      state.isLoading = true;
    },
    LoginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoginUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    RegisterUserRequest: (state) => {
      state.isLoading = true;
    },
    RegisterUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    RegisterUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    LoadUserRequest: (state) => {
      state.isLoading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  LoginUserSuccess,
  LoginUserRequest,
  LoginUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
  RegisterUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFailure,
  clearErrors,
} = authSlice.actions;

export default authSlice.reducer;
