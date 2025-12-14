import axios from "axios";

export const getUserStudyStats = async (userId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/ml-predictions/user/${userId}/latest`
    );

    const userData = res.data.data || {};

    return {
      user_id: userData.user_id,
      journey_id: userData.journey_id,
      name: userData.name || "User",
      gaya_belajar: userData.gaya_belajar,
      deskripsi: userData.deskripsi,
      saran: userData.saran,
      total_active_days: userData.total_active_days,
      avg_study_duration: userData.avg_study_duration,
      study_duration_per_day: userData.study_duration_per_day || [],
    };
  } catch (err) {
    console.error("Failed to fetch user study stats:", err);
    return null;
  }
};

