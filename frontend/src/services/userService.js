import { v4 as uuid } from "uuid";
import { userProfiles } from "./mockData";

// Fetch all user profiles
export const fetchUserProfiles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...userProfiles]);
    }, 500);
  });
};

// Fetch a user profile by user ID
export const fetchUserProfile = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = userProfiles.find((u) => u.id === userId);
      if (user) {
        resolve({ ...user });
      } else {
        // Create a default profile if none exists
        const defaultProfile = {
          id: userId,
          firstName: "",
          lastName: "",
          email: "",
          role: "student",
          avatar: "",
          bio: "",
          location: "",
          skills: [],
          education: [],
          experience: [],
          mentorshipAvailable: false,
        };
        resolve(defaultProfile);
      }
    }, 500);
  });
};

// Alias for fetchUserProfile (for compatibility)
export const fetchProfile = async (userId) => {
  return fetchUserProfile(userId);
};

// Update or create a user profile
export const updateUserProfile = async (profileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = userProfiles.findIndex((u) => u.id === profileData.id);
      if (index !== -1) {
        userProfiles[index] = {
          ...userProfiles[index],
          ...profileData,
          mentorshipAvailable: profileData.mentorshipAvailable ?? false,
        };
        resolve({ ...userProfiles[index] });
      } else {
        const newProfile = {
          ...profileData,
          mentorshipAvailable: profileData.mentorshipAvailable ?? false,
        };
        userProfiles.push(newProfile);
        resolve({ ...newProfile });
      }
    }, 500);
  });
};

// Alias for updateUserProfile (for compatibility)
export const updateProfile = updateUserProfile;
