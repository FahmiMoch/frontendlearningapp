import React, { useEffect, useState } from "react";
import { getJourneys, getJourneyTutorials } from "../../services/studyTrackers";

export default function Learning() {
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [journeyDetail, setJourneyDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const journeys = await getJourneys();

        if (journeys && journeys.length > 0) {
          const tutorialsData = await getJourneyTutorials(journeys[0].id);
          setTutorials(tutorialsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch learning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetail = async (journeyId) => {
    try {
      setSelectedJourney(journeyId);
      const journeys = await getJourneys();
      const detail = journeys?.find((j) => j.id === journeyId);
      setJourneyDetail(detail || null);
    } catch (error) {
      console.error("Failed to fetch journey detail:", error);
      setJourneyDetail(null);
    }
  };

  return (
    <article className="relative bg-white p-4 rounded-xl shadow-md min-h-[400px]">
      <h2 className="flex items-center gap-2 mb-3 font-semibold text-base md:text-lg">
        <span className="w-5 h-5 rounded-md bg-gray-200" />
        Aktivitas belajar
      </h2>

      <div className="w-full h-px bg-gray-300 mb-4" />

      {loading ? (
        <div className="p-2 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
          <div className="h-4 w-3/4 rounded bg-gray-300 mb-3" />
          <div className="h-3 w-1/4 rounded bg-gray-300" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {tutorials.length > 0 ? (
            tutorials.map((t) => (
              <div
                key={t.id}
                className="group p-2 rounded-xl bg-gradient-to-br 
                           from-gray-100 to-gray-200"
              >
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {t.title}
                </p>

                <button
                  onClick={() => handleViewDetail(t.journeyId || 1)}
                  className="mt-3 text-xs font-semibold text-[#0052D5] 
                             opacity-80 underline"
                >
                  Lihat Detail →
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada tutorial.</p>
          )}
        </div>
      )}

      {selectedJourney && journeyDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedJourney(null)}
          />

          <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {journeyDetail.name}
              </h3>
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full 
                               bg-yellow-100 text-yellow-700"
              >
                On Going
              </span>
            </div>

            <div className="my-4 h-px bg-gray-200" />

            <p className="text-sm text-gray-600 leading-relaxed">
              {journeyDetail.summary}
            </p>

            <button
              onClick={() => setSelectedJourney(null)}
              className="mt-6 w-full py-2.5 rounded-xl font-semibold 
                         bg-[#033E5F]
                         text-white transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
