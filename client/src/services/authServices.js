import api from "../api/api";

export const studentSignup = async (data) => {
  const response = await api.post("/student/signup", data);
  return response.data;
};

export const societySignup = async (data) => {
  const response = await api.post("/society/signup", data);
  return response.data;
};

export const studentLogin = async (data) => {
  const response = await api.post("/student/login", data);
  return response.data;
};

export const societyLogin = async (data) => {
  const response = await api.post("/society/login", data);
  return response.data;
};
export const adminLogin = async (data) => {
  const response = await api.post(
    "/admin/login",
    data
  );

  return response.data;
};
export const verifyOTP = async (data) => {
  const response = await api.post("/student/verify-otp", data);
  return response.data;
};

 export const resendOTP = async (email) => {
  const response = await api.post("/student/resend-otp", {
    email,
  });

  return response.data;
}; 
export const getStudentProfile = async () => {
  const response = await api.get("/student/profile");
  return response.data;
};
export const updateStudentProfile = async (data) => {
  const response = await api.put("/student/profile", data);
  return response.data;
};
export const uploadProfilePicture = async (image) => {
  const formData = new FormData();

  formData.append("profilePicture", image);

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
export const removeProfilePicture = async () => {

  const response = await api.delete(
    "/student/remove-profile-picture"
  );

  return response.data;

};
// ======================
// SOCIETY PROFILE
// ======================

// Get Society Profile
export const getSocietyProfile = async () => {
  const response = await api.get("/society/profile");
  return response.data;
};

// Update Society Profile
export const updateSocietyProfile = async (data) => {
  const response = await api.put("/society/profile", data);
  return response.data;
};

// Upload Society Logo
export const uploadSocietyLogo = async (image) => {
  const formData = new FormData();

  formData.append("logo", image);

  const response = await api.put(
    "/society/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const removeSocietyLogo = async () => {

  const response = await api.delete(
    "/society/logo"
  );

  return response.data;

};
// ==========================
// Student Forgot Password
// ==========================

export const studentForgotPassword = async (
  data
) => {

  const response = await api.post(
    "/student/forgot-password",
    data
  );

  return response.data;

};

export const studentResetPassword = async (
  data
) => {

  const response = await api.post(
    "/student/reset-password",
    data
  );

  return response.data;

};

// ==========================
// Society Forgot Password
// ==========================

export const societyForgotPassword = async (
  data
) => {

  const response = await api.post(
    "/society/forgot-password",
    data
  );

  return response.data;

};

export const societyResetPassword = async (
  data
) => {

  const response = await api.post(
    "/society/reset-password",
    data
  );

  return response.data;

};

export const getAllFeedback = async () => {
  const response = await api.get(
    "/society/feedback"
  );

  return response.data;
};

export const getEventFeedback = async (id) => {
  const response = await api.get(
    `/society/event/${id}/feedback`
  );

  return response.data;
};

// ==========================
// Society Members
// ==========================

// Get Members
export const getMembers = async (
  search = ""
) => {

  const response = await api.get(
    "/society/members",
    {
      params: {
        search,
      },
    }
  );

  return response.data;

};

// Remove Member
export const removeMember = async (
  id
) => {

  const response = await api.patch(
    `/society/member/${id}/remove`
  );

  return response.data;

};