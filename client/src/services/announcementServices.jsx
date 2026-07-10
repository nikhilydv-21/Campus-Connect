import api from "../api/api";

export const sendAnnouncement = async (data) => {

    const response = await api.post(
        "/society/announcement",
        data
    );

    return response.data;

};