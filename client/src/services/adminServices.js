import api from "../api/api";

// ==========================
// Admin Dashboard
// ==========================

export const getDashboard = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

// ==========================
// Pending Societies
// ==========================

export const getPendingSocieties = async () => {
  const response = await api.get(
    "/admin/pending-societies"
  );

  return response.data;
};

export const approveSociety = async (id) => {
  const response = await api.put(
    `/admin/approve-society/${id}`
  );

  return response.data;
};

export const rejectSociety = async (id) => {
  const response = await api.patch(
    `/admin/reject-society/${id}`
  );

  return response.data;
};
// ==========================
// All Societies
// ==========================

export const getAllSocieties = async (
  search = ""
) => {
  const response = await api.get(
    "/admin/societies",
    {
      params: {
        search,
      },
    }
  );

  return response.data;
};

export const getSocietyDetails = async (id) => {
  const response = await api.get(
    `/admin/society/${id}`
  );

  return response.data;
};

export const deleteSociety = async (id) => {
  const response = await api.delete(
    `/admin/society/${id}`
  );

  return response.data;
};

export const disableSociety = async (id) => {

  const response = await api.patch(
    `/admin/society/${id}/disable`
  );

  return response.data;

};

// ==========================
// Students
// ==========================

export const getAllStudents = async (
  search = ""
) => {

  const response = await api.get(
    "/admin/students",
    {
      params: {
        search,
      },
    }
  );

  return response.data;

};

export const getStudentDetails = async (
  id
) => {

  const response = await api.get(
    `/admin/student/${id}`
  );

  return response.data;

};

// ==========================
// Events
// ==========================

export const getAllEvents = async (
  search = "",
  category = "",
  status = ""
) => {

  const response = await api.get(
    "/admin/events",
    {
      params: {
        search,
        category,
        status,
      },
    }
  );

  return response.data;

};

export const getEventDetails = async (
  id
) => {

  const response = await api.get(
    `/admin/event/${id}`
  );

  return response.data;

};