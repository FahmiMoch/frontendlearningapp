import React from "react";

function SummarySkeletonCard() {
  return (
    <article
      className="
        w-full h-full bg-[#1c4465]/70 p-6 rounded-xl
        animate-pulse
      "
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20" />
        <div className="h-4 w-28 bg-white/20 rounded" />
      </div>

      <div className="h-7 w-36 bg-white/30 rounded mt-6" />
    </article>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <article
      className="
        w-full h-full bg-[#1c4465] text-white p-6 rounded-xl
        shadow
        flex flex-col justify-between
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:bg-[#1f4f76]
      "
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 p-2 rounded-lg bg-white/10 border border-white/20">
          {icon}
        </div>

        <p className="text-sm opacity-90 tracking-wide">{title}</p>
      </div>

      <h3 className="text-2xl font-bold mt-6 tracking-tight">{value}</h3>
    </article>
  );
}

export default function SummarySection({ userReport, loading }) {
  if (loading) {
    return (
      <section className="mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SummarySkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  const data = userReport || {};

  const summaries = [
    {
      title: "Durasi Belajar",
      value: `${Number(data.avg_study_duration || 0).toFixed(1)} Menit`,
    },
    {
      title: "Konsistensi",
      value: `${data.total_active_days || 0} Hari Aktif`,
    },
    {
      title: "Nilai Ujian",
      value: "85 / 100",
    },
    {
      title: "Gaya Belajar",
      value: data.gaya_belajar || "Belum terdeteksi",
    },
  ];

  const icons = [
    <svg
      key="clock"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>,

    <svg
      key="calendar"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 9h18M4.5 19.5h15a1.5 1.5 0 0 0 1.5-1.5V9.75H3v8.25a1.5 1.5 0 0 0 1.5 1.5Z"
      />
    </svg>,

    <svg
      key="chart"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v18h18M7.5 15l3-3 2.25 2.25L18 9"
      />
    </svg>,

    <svg
      key="brain"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4.5a3 3 0 0 0-3 3v.75a3 3 0 0 0-1.5 5.25A3 3 0 0 0 6 18.75h.75A3 3 0 0 0 12 20.25a3 3 0 0 0 5.25-1.5H18a3 3 0 0 0 1.5-5.25A3 3 0 0 0 18 7.5v-.75a3 3 0 0 0-3-3"
      />
    </svg>,
  ];

  return (
    <section className="mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {summaries.map((item, idx) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={icons[idx]}
          />
        ))}
      </div>
    </section>
  );
}
