// loader slice use for all redux action that need to show loading status
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIntial: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setLoading: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";    
    },
    setSucess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { setLoading, setSucess, setError, setIntial } = loaderSlice.actions;

export default loaderSlice.reducer;
