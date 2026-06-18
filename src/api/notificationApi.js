import axiosInstance from "./axiosInstance";

export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const getNotificationById = async (id) => {
  const response = await axiosInstance.get(`/notifications/${id}`);
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await axiosInstance.post(
    "/notifications",
    notificationData
  );
  return response.data;
};

export const updateNotification = async (id, notificationData) => {
  const response = await axiosInstance.put(
    `/notifications/${id}`,
    notificationData
  );
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await axiosInstance.delete(`/notifications/${id}`);
  return response.data;
};