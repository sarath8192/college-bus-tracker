import axiosInstance from "./axiosInstance";

export const getStudents = async () => {
  const response = await axiosInstance.get("/students");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await axiosInstance.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axiosInstance.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await axiosInstance.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/students/${id}`);
  return response.data;
};