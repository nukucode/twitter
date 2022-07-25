import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
