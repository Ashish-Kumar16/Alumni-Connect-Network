import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
  myOffers: [],
  requests: [],
  myRequests: [],
  loading: false,
  error: null,
};

const mentorshipSlice = createSlice({
  name: "mentorship",
  initialState,
  reducers: {
    fetchOffersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOffersSuccess: (state, action) => {
      state.offers = action.payload;
      state.loading = false;
    },
    fetchOffersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMyOffersSuccess: (state, action) => {
      state.myOffers = action.payload;
      state.loading = false;
    },
    createOfferStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOfferSuccess: (state, action) => {
      state.myOffers = [...state.myOffers, action.payload];
      state.loading = false;
    },
    createOfferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRequestsSuccess: (state, action) => {
      state.requests = action.payload;
      state.loading = false;
    },
    fetchRequestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMyRequestsSuccess: (state, action) => {
      state.myRequests = action.payload;
      state.loading = false;
    },
    createRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRequestSuccess: (state, action) => {
      state.myRequests = [...state.myRequests, action.payload];
      state.loading = false;
    },
    createRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRequestStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRequestStatusSuccess: (state, action) => {
      state.requests = state.requests.map((req) =>
        req.id === action.payload.id
          ? { ...req, status: action.payload.status }
          : req,
      );
      state.loading = false;
    },
    updateRequestStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
  fetchMyOffersSuccess,
  createOfferStart,
  createOfferSuccess,
  createOfferFailure,
  fetchRequestsStart,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  fetchMyRequestsSuccess,
  createRequestStart,
  createRequestSuccess,
  createRequestFailure,
  updateRequestStatusStart,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
} = mentorshipSlice.actions;

export default mentorshipSlice.reducer;
