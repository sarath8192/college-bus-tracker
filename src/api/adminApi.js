import axiosInstance from "./axiosInstance";

export const getAdminDashboardStats = async () => {
  const response = await axiosInstance.get("/admin/dashboard");
  return response.data;
};

export const getAdminReports = async () => {
  const response = await axiosInstance.get("/admin/reports");
  return response.data;
};
