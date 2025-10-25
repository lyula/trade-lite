import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// Register user
export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Get all users
export async function getAllUsers() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
  return res.data;
}

// Create or sync user
export async function createOrSyncUser(clerkId: string, firstName: string, lastName: string) {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
    clerkId,
    firstName,
    lastName,
  });
}
