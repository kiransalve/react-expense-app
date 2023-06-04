import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggledarkMode: (state, actions) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggledarkMode } = themeSlice.actions;
export default themeSlice.reducer;
