import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const forgotPassword = async (passwordData) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    passwordData,
  );
  return response.data;
};
