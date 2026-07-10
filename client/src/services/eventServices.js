import api from "../api/api";

// Create Event
export const createEvent = async (formData) => {
  const response = await api.post("/event/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get My Events
export const getMyEvents = async (
  search = "",
  status = ""
) => {
  const response = await api.get(
    "/event/my-events",
    {
      params: {
        search,
        status,
      },
    }
  );

  return response.data;
};

// Get Event By Id
export const getEventById = async (id) => {
  const response = await api.get(`/event/${id}`);
  return response.data;
};

// Update Event
export const updateEvent = async (id, formData) => {
  const response = await api.put(`/event/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await api.delete(`/event/${id}`);
  return response.data;
};

// Get Past Events
export const getPastEvents = async (search = "") => {
  const response = await api.get("/event/past-events", {
    params: { search },
  });

  return response.data;
};

// Get Past Event Details
export const getPastEventDetails = async (id) => {
  const response = await api.get(`/event/past-events/${id}`);
  return response.data;
};

// Get Event Participants
export const getEventParticipants = async (
  eventId,
  search,
  attendance
) => {

  const response = await api.get(
    `/event/${eventId}/participants`,
    {
      params: {
        search,
        attendance,
      },
    }
  );

  return response.data;

};



// Mark Attendance
export const markAttendance = async (
  eventId,
  registrationId
) => {

  const response = await api.patch(
    `/event/${eventId}/attendance/${registrationId}`
  );

  return response.data;

};

export const exportParticipantsCSV = async (
  eventId,
  attendance
) => {

  return api.get(
    `/event/${eventId}/participants/export`,
    {
      params: {
        attendance,
      },
      responseType: "blob",
    }
  );

};



export const toggleEventLike = async (id) => {
  const response = await api.put(`/event/${id}/like`);
  return response.data;
};
export const generateCertificates = async (id) => {
    const response = await api.post(
        `/society/event/${id}/generate-certificates`
    );

    return response.data;
};