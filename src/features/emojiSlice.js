import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  emoji: false,
};

export const emojiSlice = createSlice({
  name: "emoji",
  initialState,
  reducers: {
    emoji: (state, action) => {
      state.emoji = action.payload;
    },
  },
});

export const { emoji } = emojiSlice.actions;
export default emojiSlice.reducer;
