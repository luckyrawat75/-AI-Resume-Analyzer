// src/services/auth.js

import API from "./api";


export const registerUser = async (formData) => {
  try {
    const res = await API.post("/auth/register", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Register failed";
  }
};


export const loginUser = async (formData) => {
  try {
    const res = await API.post("/auth/login", formData);

    // Save token in localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

//  Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};