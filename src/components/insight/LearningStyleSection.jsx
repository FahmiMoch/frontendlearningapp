import React from "react";

// =====================================================
// TYPE CARD (PRESENTATIONAL)
// =====================================================
function TypeCard({ title, icon, desc }) {
  return (
    <article className="w-full bg-white p-5 sm:p-6 rounded-xl shadow flex gap-5 flex-col sm:flex-row">
      <div className="shrink-0">{icon}</div>

      <div className="flex-1 mt-3 sm:mt-0">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
      </div>
    </article>
  );
}

export default function LearningStyleSection({ userReport, loading }) {
  // =====================================================
  // ICON BASE STYLE
  // =====================================================
  const iconClass = "size-6 text-[#0A6A8D]";

  // =====================================================
  // FALLBACK LEARNING STYLES
  // NOTE:
  // - Dipakai saat ML belum tersedia
  // - UI tetap hidup walau tanpa data
  // =====================================================
  const FALLBACK_TYPES = [
    {
      title: "Fast Learner",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className={iconClass}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      ),
      desc: "Kamu menyelesaikan materi dengan cepat dan mampu memahami konsep secara singkat.",
    },
    {
      title: "Consistent Learner",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className={iconClass}
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      ),
      desc: "Pola belajarmu stabil dan kamu mempertahankan ritme tiap minggu.",
    },
    {
      title: "Reflective Learner",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className={iconClass}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 4.5a3 3 0 0 0-3 3v.75a3 3 0 0 0-1.5 5.25A3 3 0 0 0 6 18.75h.75A3 3 0 0 0 12 20.25a3 3 0 0 0 5.25-1.5H18a3 3 0 0 0 1.5-5.25A3 3 0 0 0 18 7.5v-.75a3 3 0 0 0-3-3"
          />
        </svg>
      ),
      desc: "Kamu lebih fokus pada pemahaman mendalam dan refleksi.",
    },
  ];

  const learningTypes =
    userReport?.learning_style?.length > 0
      ? userReport.learning_style
      : FALLBACK_TYPES;

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading learning style...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-10 space-y-4">
      {learningTypes.map((type) => (
        <TypeCard
          key={type.title}
          title={type.title}
          icon={type.icon}
          desc={type.desc}
        />
      ))}
    </section>
  );
}
