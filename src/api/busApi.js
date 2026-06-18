import axiosInstance from "./axiosInstance";

export const getBuses = async () => {
  const response = await axiosInstance.get("/buses");
  return response.data;
};

export const getBusById = async (id) => {
  const response = await axiosInstance.get(`/buses/${id}`);
  return response.data;
};

export const createBus = async (busData) => {
  const response = await axiosInstance.post("/buses", busData);
  return response.data;
};

export const updateBus = async (id, busData) => {
  const response = await axiosInstance.put(`/buses/${id}`, busData);
  return response.data;
};

export const deleteBus = async (id) => {
  const response = await axiosInstance.delete(`/buses/${id}`);
  return response.data;
};