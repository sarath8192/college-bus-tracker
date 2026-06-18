import axiosInstance from "./axiosInstance";

export const getTrips = async () => {
  const response = await axiosInstance.get("/trips");
  return response.data;
};

export const getActiveTrips = async () => {
  const response = await axiosInstance.get("/trips/active");
  return response.data;
};

export const startTrip = async (tripData) => {
  const response = await axiosInstance.post("/trips/start", tripData);
  return response.data;
};

export const updateTripLocation = async (id, locationData) => {
  const response = await axiosInstance.put(`/trips/${id}/location`, locationData);
  return response.data;
};

export const endTrip = async (id) => {
  const response = await axiosInstance.put(`/trips/${id}/end`);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await axiosInstance.delete(`/trips/${id}`);
  return response.data;
};