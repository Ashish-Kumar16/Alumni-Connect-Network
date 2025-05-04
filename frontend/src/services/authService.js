import { authUsers } from "./mockData";

// Function to simulate login
export const login = async (email, password) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For fake login, accept any email and password
      // Create a fake user with the provided email
      const fakeUser = {
        id: `user-${Date.now()}`,
        email,
        // Assign a role based on the email for demo purposes
        role: email.includes("alumni") ? "alumni" : "student",
      };
      persistAuth(fakeUser);
      resolve(fakeUser);
    }, 500);
  });
};

// Function to simulate registration
export const register = async (email, password, role) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you would create a new user in the database
      // For mock, just return a success response with any email and password
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        role,
      };
      persistAuth(newUser);
      resolve(newUser);
    }, 500);
  });
};

// Function to simulate checking authentication status
export const checkAuth = () => {
  const authData = localStorage.getItem("auth");
  return authData !== null;
};

// Function to simulate getting current user
export const getCurrentUser = () => {
  const authData = localStorage.getItem("auth");
  if (!authData) {
    return null;
  }
  try {
    return JSON.parse(authData);
  } catch (error) {
    console.error("Error parsing auth data", error);
    return null;
  }
};

// Function to persist authentication data
export const persistAuth = (userData) => {
  localStorage.setItem("auth", JSON.stringify(userData));
};

// Function to clear authentication data
export const clearAuth = () => {
  localStorage.removeItem("auth");
};
