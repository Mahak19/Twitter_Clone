import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        forgotPasswordRequest: (state) => {
            state.isLoading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        },
        forgotPasswordFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
