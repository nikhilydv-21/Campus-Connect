import api from "../api/api";

export const changePassword = async (data) => {
  const response = await api.put(
    "/society/change-password",
    data
  );

  return response.data;
};