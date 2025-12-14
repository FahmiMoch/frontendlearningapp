import React from "react";

function TypeCard({ title, icon, desc }) {
  return (
    <article
      className="
        group w-full
        bg-white border border-slate-100
        p-6 rounded-2xl shadow-sm
        flex gap-5 flex-col sm:flex-row
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-0.5
      "
    >
      <div
        className="
          shrink-0 w-12 h-12 rounded-xl
          bg-[#0A6A8D]/10 text-[#0A6A8D]
          flex items-center justify-center
          group-hover:bg-[#0A6A8D]/15
        "
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-base sm:text-lg text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</p>
      </div>
    </article>
  );
}

function TypeSkeleton() {
  return (
    <article className="w-full p-6 rounded-2xl bg-slate-100 animate-pulse">
      <div className="flex gap-5 items-start">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-slate-200 rounded" />
          <div className="h-3 w-full bg-slate-200 rounded" />
          <div className="h-3 w-2/3 bg-slate-200 rounded" />
        </div>
      </div>
    </article>
  );
}

export default function LearningStyleSection({ userReport, loading }) {
  const iconClass = "w-6 h-6";

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
      <section className="max-w-6xl mx-auto mt-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <TypeSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Gaya Belajar Kamu
        </h2>
        <p className="text-sm text-slate-500">
          Analisis pola belajar berdasarkan aktivitas mingguan
        </p>
      </header>

      <div className="space-y-4">
        {learningTypes.map((type) => (
          <TypeCard
            key={type.title}
            title={type.title}
            icon={type.icon}
            desc={type.desc}
          />
        ))}
      </div>
    </section>
  );
}
