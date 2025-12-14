import React, { useEffect, useState } from "react";
import { getJourneys, getJourneyTutorials } from "../../services/studyTrackers";

export default function Learning() {
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [journeyDetail, setJourneyDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const journeys = await getJourneys();
      if (journeys.length > 0) {
        const tutorialsData = await getJourneyTutorials(journeys[0].id);
        setTutorials(tutorialsData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleViewDetail = async (journeyId) => {
    setSelectedJourney(journeyId);
    try {
      const journeys = await getJourneys();
      const detail = journeys.find((j) => j.id === journeyId);
      setJourneyDetail(detail);
    } catch (err) {
      console.error("Failed to fetch journey detail:", err);
      setJourneyDetail(null);
    }
  };

  return (
    <article className="bg-white p-4 rounded-xl shadow-md relative">
      <h2 className="font-semibold mb-3 flex items-center gap-2 text-base md:text-md">
        <span className="w-5 h-5 bg-gray-200 rounded-md inline-block"></span>
        Aktivitas belajar
      </h2>
      <div className="h-px bg-gray-200 w-full mb-4"></div>

      {loading ? (
        <div className="space-y-3">
          <div className="animate-pulse h-8 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-8 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-8 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-8 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:flex-col">
          {tutorials.length > 0 ? (
            tutorials.map((t) => (
              <div
                key={t.id}
                className="bg-gray-200 p-4 rounded-lg text-black flex flex-col justify-between shadow hover:shadow-lg transition duration-200"
              >
                <span className="font-medium text-sm">{t.title}</span>

                <button
                  className="text-[#0052D5] text-[10px] mt-1 underline self-start"
                  onClick={() => handleViewDetail(t.journeyId || 1)}
                >
                  Lihat Detail
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada tutorial.</p>
          )}
        </div>
      )}

      {selectedJourney && journeyDetail && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedJourney(null)}
          ></div>

          <div className="bg-white rounded-2xl shadow-2xl z-10 max-w-md w-full p-6 animate-fadeIn">
            <h3 className="font-bold text-xl text-gray-800">
              {journeyDetail.name}
            </h3>
            <p className="text-gray-600 mt-3">{journeyDetail.summary}</p>
            <div className="mt-4 flex justify-between text-xs text-gray-500 font-medium">
              <span>Point: {journeyDetail.point}</span>
              <span>XP: {journeyDetail.xp}</span>
              <span>Status: {journeyDetail.status}</span>
            </div>
            <button
              className="mt-6 w-full bg-[#033E5F] text-white py-2 rounded-xl font-semibold transition duration-200"
              onClick={() => setSelectedJourney(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
