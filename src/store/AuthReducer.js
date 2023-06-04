import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  idToken: localStorage.getItem("idToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.idToken = action.payload.idToken;
      localStorage.setItem("idToken", JSON.stringify(state.idToken));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.idToken = null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout, getUserDataFromInput } = authSlice.actions;
export default authSlice.reducer;
