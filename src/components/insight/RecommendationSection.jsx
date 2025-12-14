import React from "react";

// =====================================================
// RECOMMENDATION CARD (PURE PRESENTATIONAL)
// =====================================================
function RecoCard({ title, desc }) {
  return (
    <article className="w-full h-full bg-white p-5 sm:p-6 rounded-xl shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>

      {/* NOTE:
          Button masih UI-only (belum ada action)
          Aman untuk sekarang
      */}
      <button
        type="button"
        className="mt-4 text-blue-600 text-sm hover:underline self-start"
      >
        Lihat detail
      </button>
    </article>
  );
}

export default function RecommendationSection({ userReport, loading }) {
  // =====================================================
  // LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading recommendations...
      </div>
    );
  }

  // =====================================================
  // DATA NORMALIZATION (DEFENSIVE)
  // NOTE:
  // - Component ini TIDAK fetch data
  // - Hanya baca dari userReport
  // =====================================================
  const recommendations =
    Array.isArray(userReport?.saran) && userReport.saran.length > 0
      ? userReport.saran.map((text, idx) => ({
          title: `Rekomendasi ${idx + 1}`,
          desc: text,
        }))
      : [
          {
            title: "Belum ada rekomendasi",
            desc: "Data ML prediction belum tersedia.",
          },
        ];

  return (
    <section className="mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((item, idx) => (
            <RecoCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
