import React, { createContext, useContext, useState, useEffect } from "react";
import { getMLPrediction } from "../services/insight"; // ganti import

const InsightContext = createContext();

export const InsightProvider = ({ children, userId }) => {
  const [insights, setInsights] = useState(null); // berisi ML report
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchMLReport = async () => {
      try {
        setLoading(true);
        const data = await getMLPrediction({ userId }); // POST ke /ml-predictions
        setInsights(data);
      } catch (err) {
        console.error("Failed to fetch ML Prediction:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMLReport();
  }, [userId]);

  return (
    <InsightContext.Provider value={{ insights, loading, error, setInsights }}>
      {children}
    </InsightContext.Provider>
  );
};

export const useInsight = () => useContext(InsightContext);
