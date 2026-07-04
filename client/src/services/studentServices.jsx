import api from "../api/api";

export const getStudentProfile = async () => {
  const response = await api.get("/student/profile");
  return response.data;
};

export const updateStudentProfile = async (data) => {
  const response = await api.put("/student/profile", data);
  return response.data;
};

export const uploadProfilePicture = async (formData) => {
  const response = await api.put(
    "/student/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Explore Societies
// ==========================

// Get All Societies
export const getAllSocieties = async (
  search = "",
  type = ""
) => {
  const response = await api.get("/student/societies", {
    params: {
      search,
      type,
    },
  });

  return response.data;
};

// Get Society Details
export const getSocietyDetails = async (id) => {
  const response = await api.get(`/student/society/${id}`);

  return response.data;
};

// Join Society
export const joinSociety = async (
  societyId,
  reason
) => {
  const response = await api.post(
    `/student/join-society/${societyId}`,
    {
      reason,
    }
  );

  return response.data;
};

export const getMySocieties = async () => {
  const response = await api.get("/student/my-societies");
  return response.data;
};

export const getAllEvents = async (
  search = "",
  status = ""
) => {
  const response = await api.get(
    "/student/events",
    {
      params: {
        search,
        status,
      },
    }
  );

  return response.data;
};

export const getEventDetails = async (id) => {
  const response = await api.get(
    `/student/event/${id}`
  );

  return response.data;
};

export const registerEvent = async (id) => {
  const response = await api.post(
    `/student/event/${id}/register`
  );

  return response.data;
};

export const toggleLikeEvent = async (id) => {
  const response = await api.post(
    `/student/event/${id}/like`
  );

  return response.data;
};
export const getMyEvents = async (
  search = "",
  status = ""
) => {
  const response = await api.get(
    "/student/my-events",
    {
      params: {
        search,
        status,
      },
    }
  );

  return response.data;
};
export const getLikedEvents = async (
  search = ""
) => {
  const response = await api.get(
    "/student/liked-events",
    {
      params: {
        search,
      },
    }
  );

  return response.data;
};
export const changePassword = async (data) => {
  const response = await api.put(
    "/student/change-password",
    data
  );

  return response.data;
};