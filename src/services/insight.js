import api from "./api";

export const getMLPrediction = async (payload) => {
  try {
    const response = await api.post("/ml-predictions", payload);
    return response.data?.data || null;
  } catch (error) {
    console.error(
      "getMLPrediction error:",
      error.response?.data || error.message,
    );
    return null; 
  }
};
