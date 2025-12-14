import React from "react";

function RecoCard({ title, desc }) {
  return (
    <article className="w-full h-full bg-white p-5 sm:p-6 rounded-xl shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </article>
  );
}

export default function RecommendationSection({ userReport, loading }) {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading recommendations...
      </div>
    );
  }

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
