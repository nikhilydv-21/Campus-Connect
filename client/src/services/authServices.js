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