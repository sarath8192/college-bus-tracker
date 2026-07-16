import axiosInstance from "./axiosInstance";

const extractTrips = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.trips)) {
    return responseData.trips;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  if (Array.isArray(responseData?.data?.trips)) {
    return responseData.data.trips;
  }

  return [];
};

export const getTrips = async () => {
  try {
    const response = await axiosInstance.get("/trips");

    console.log("Get trips response:", response.data);

    return extractTrips(response.data);
  } catch (error) {
    console.error(
      "Error getting trips:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const getActiveTrips = async () => {
  try {
    const response = await axiosInstance.get("/trips/active");

    console.log("Get active trips response:", response.data);

    return extractTrips(response.data);
  } catch (error) {
    console.error(
      "Error getting active trips:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const startTrip = async (tripData) => {
  try {
    const response = await axiosInstance.post("/trips/start", tripData);

    console.log("Start trip response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error starting trip:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const updateTripLocation = async (id, locationData) => {
  try {
    if (!id) {
      throw new Error("Trip ID is required to update trip location.");
    }

    const response = await axiosInstance.put(
      "/trips/" + id + "/location",
      locationData,
    );

    console.log("Update trip location response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error updating trip location:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const endTrip = async (id) => {
  try {
    if (!id) {
      throw new Error("Trip ID is required to end the trip.");
    }

    const response = await axiosInstance.put("/trips/" + id + "/end");

    console.log("End trip response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error ending trip:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const deleteTrip = async (id) => {
  try {
    if (!id) {
      throw new Error("Trip ID is required to delete the trip.");
    }

    const response = await axiosInstance.delete("/trips/" + id);

    console.log("Delete trip response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting trip:",
      error.response?.data || error.message,
    );

    throw error;
  }
};