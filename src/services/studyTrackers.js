import axios from "./api"; 

export const recordStudyDuration = async (journeyId, durationInSeconds) => {
  try {
    const res = await axios.post(`/journeys/${journeyId}/study-duration`, {
      duration: durationInSeconds,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to record study duration:", err);
    return null;
  }
};


export const getJourneys = async () => {
  try {
    const res = await axios.get("/journeys");
    return res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch journeys:", err);
    return [];
  }
};

export const getJourneyTutorials = async (journeyId) => {
  try {
    const res = await axios.get(`/journeys/${journeyId}/tutorials`);
    return res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch tutorials:", err);
    return [];
  }
};
