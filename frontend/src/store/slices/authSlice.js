import { createSlice } from "@reduxjs/toolkit";
import {
  persistAuth,
  clearAuth,
  getCurrentUser,
} from "../../services/authService";

// Initial state based on localStorage
const authUser = getCurrentUser();

const initialState = authUser
  ? {
      isAuthenticated: true,
      user: {
        id: authUser.id || null,
        email: authUser.email || null,
        role: authUser.role || null,
      },
      loading: false,
      error: null,
    }
  : {
      isAuthenticated: false,
      user: {
        id: null,
        email: null,
        role: null,
      },
      loading: false,
      error: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      persistAuth(action.payload);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        email: null,
        role: null,
      };
      clearAuth();
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
