import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'Dark',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.mode = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;