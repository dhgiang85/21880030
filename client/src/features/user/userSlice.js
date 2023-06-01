import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  count: null,
  numberOfPages: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
