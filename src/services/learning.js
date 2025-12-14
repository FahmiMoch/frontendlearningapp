import api from "./api";

export const predictML = async (payload) => {
  try {
    const response = await api.post("/ml/predict", payload);
    return response.data;
  } catch (error) {
    console.error("predictML error:", error.response?.data || error.message);
    throw error;
  }
};
