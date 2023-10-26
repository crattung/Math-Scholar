import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    removeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const setLoading = loadingSlice.actions.setLoading;
export const removeLoading = loadingSlice.actions.removeLoading;
export const loadingReducer = loadingSlice.reducer;
