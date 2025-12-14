import React, { useState, useEffect } from "react";
import HeaderInsight from "../components/insight/HeaderInsight";
import Report from "../components/insight/Report";
import SummarySection from "../components/insight/SummarySection";
import ChartSection from "../components/insight/ChartSection";
import LearningStyleSection from "../components/insight/LearningStyleSection";
import RecommendationSection from "../components/insight/RecommendationSection";
import FooterInsight from "../components/insight/FooterInsight";
import { getUserStudyStats } from "../services/studyStats";

export default function InsightDashboard() {
  const [range, setRange] = useState(7);
  const [userId, setUserId] = useState(null);
  const [userReport, setUserReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.display_name || "User";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.userId);
    } catch (err) {
      console.error("Failed to parse token:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserReport = async () => {
      setLoading(true);
      try {
        const data = await getUserStudyStats(userId);
        setUserReport(data);
      } catch (err) {
        console.error("Failed to fetch user report:", err);
        setUserReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReport();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] text-gray-900">
      <HeaderInsight />
      <main className="max-w-6xl mx-auto px-4 pt-[100px]">
        <Report userReport={userReport} loading={loading} userName={userName} />
        <SummarySection userReport={userReport} loading={loading} />
        {loading ? (
          <div className="text-center py-6 text-gray-400">
            Loading chart data...
          </div>
        ) : userReport?.journey_id ? (
          <ChartSection range={range} setRange={setRange} userId={userId} />
        ) : (
          <div className="text-center py-6 text-gray-500">
            ⚠️ Journey data not available
          </div>
        )}
        <LearningStyleSection userReport={userReport} loading={loading} />

        <RecommendationSection userReport={userReport} loading={loading} />
      </main>

      <FooterInsight />
    </div>
  );
}
