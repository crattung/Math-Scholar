import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorMassage } from "../types/error";

type ErrorState = {
  error: ErrorMassage | null;
};

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorMassage>) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const setError = errorSlice.actions.setError;
export const removeError = errorSlice.actions.removeError;
export const errorReducer = errorSlice.reducer;
