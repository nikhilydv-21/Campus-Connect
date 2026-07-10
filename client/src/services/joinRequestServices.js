import api from "../api/api";

// Get Join Requests
export const getJoinRequests = async (search = "") => {
  const response = await api.get("/society/join-requests", {
    params: { search },
  });

  return response.data;
};

// Accept Join Request
export const acceptJoinRequest = async (id) => {
  const response = await api.patch(
    `/society/join-request/${id}/accept`
  );

  return response.data;
};

// Reject Join Request
export const rejectJoinRequest = async (id) => {
  const response = await api.patch(
    `/society/join-request/${id}/reject`
  );

  return response.data;
};

export const sendAnnouncement = async (data) => {
  const response = await api.post(
    "/society/announcement",
    data
  );

  return response.data;
};

export const removeMember = async (id) => {
  const response = await api.patch(
    `/society/member/${id}/remove`
  );

  return response.data;
};