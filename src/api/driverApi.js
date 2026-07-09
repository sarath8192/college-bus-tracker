import axiosInstance from "./axiosInstance";

export const getDrivers = async () => {
  const response = await axiosInstance.get("/drivers");
  return response.data;
};

export const getDriverById = async (id) => {
  const response = await axiosInstance.get(`/drivers/${id}`);
  return response.data;
};

export const createDriver = async (driverData) => {
  const response = await axiosInstance.post("/drivers", driverData);
  return response.data;
};

export const updateDriver = async (id, driverData) => {
  const response = await axiosInstance.put(`/drivers/${id}`, driverData);
  return response.data;
};

export const deleteDriver = async (id) => {
  const response = await axiosInstance.delete(`/drivers/${id}`);
  return response.data;
};
