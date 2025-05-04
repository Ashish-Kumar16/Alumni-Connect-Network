import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import mentorshipReducer from "./slices/mentorshipSlice";
import jobReducer from "./slices/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    mentorship: mentorshipReducer,
    job: jobReducer,
  },
});
