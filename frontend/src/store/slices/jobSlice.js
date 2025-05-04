import { createSlice } from "@reduxjs/toolkit";

// Initial state for jobs
const initialState = {
  jobs: [],
  myJobs: [],
  applications: [],
  myApplications: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMyJobsSuccess: (state, action) => {
      state.myJobs = action.payload;
      state.loading = false;
    },
    createJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createJobSuccess: (state, action) => {
      state.myJobs = [...state.myJobs, action.payload];
      state.jobs = [...state.jobs, action.payload];
      state.loading = false;
    },
    createJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchApplicationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action) => {
      state.applications = action.payload;
      state.loading = false;
    },
    fetchApplicationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMyApplicationsSuccess: (state, action) => {
      state.myApplications = action.payload;
      state.loading = false;
    },
    applyForJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    applyForJobSuccess: (state, action) => {
      state.myApplications = [...state.myApplications, action.payload];
      state.loading = false;
    },
    applyForJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateApplicationStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateApplicationStatusSuccess: (state, action) => {
      state.applications = state.applications.map((app) =>
        app.id === action.payload.id
          ? { ...app, status: action.payload.status }
          : app,
      );
      state.loading = false;
    },
    updateApplicationStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  fetchMyJobsSuccess,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  fetchMyApplicationsSuccess,
  applyForJobStart,
  applyForJobSuccess,
  applyForJobFailure,
  updateApplicationStatusStart,
  updateApplicationStatusSuccess,
  updateApplicationStatusFailure,
} = jobSlice.actions;

export default jobSlice.reducer;
