import { v4 as uuid } from "uuid";
import {
  mockMentorshipOffers as mockOffers,
  mockMentorshipRequests as mockRequests,
} from "./mockData";

// Fetch all mentorship offers
export const fetchMentorshipOffers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockOffers]);
    }, 500);
  });
};

// Fetch mentorship offers by mentor ID
export const fetchMyMentorshipOffers = async (mentorId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offers = mockOffers.filter((offer) => offer.mentorId === mentorId);
      resolve(offers);
    }, 500);
  });
};

// Fetch a mentorship offer by ID
export const fetchMentorshipOfferById = async (offerId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const offer = mockOffers.find((offer) => offer.id === offerId);
      if (offer) {
        resolve(offer);
      } else {
        reject(new Error("Offer not found"));
      }
    }, 500);
  });
};

// Create a new mentorship offer
export const createMentorshipOffer = async (offerData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOffer = {
        id: uuid(),
        ...offerData,
        created: new Date().toISOString(),
      };
      mockOffers.push(newOffer);
      resolve(newOffer);
    }, 500);
  });
};

// Fetch mentorship requests for a mentor
export const fetchMentorshipRequests = async (mentorId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const requests = mockRequests
        .filter((request) => request.mentorId === mentorId)
        .map((request) => ({
          ...request,
          status: request.status,
        }));
      resolve(requests);
    }, 500);
  });
};

// Fetch mentorship requests for a student
export const fetchMyMentorshipRequests = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const requests = mockRequests
        .filter((request) => request.studentId === studentId)
        .map((request) => ({
          ...request,
          status: request.status,
        }));
      resolve(requests);
    }, 500);
  });
};

// Create a new mentorship request
export const createMentorshipRequest = async (requestData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest = {
        id: uuid(),
        ...requestData,
        status: "pending",
        created: new Date().toISOString(),
      };
      mockRequests.push(newRequest);
      resolve(newRequest);
    }, 500);
  });
};

// Update mentorship request status
export const updateMentorshipRequestStatus = async (requestId, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = mockRequests.find((req) => req.id === requestId);
      if (!request) {
        reject(new Error("Request not found"));
        return;
      }
      request.status = status;
      resolve({
        ...request,
        status,
      });
    }, 500);
  });
};
