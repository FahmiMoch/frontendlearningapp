import React from "react";

export default function Report({ userReport, loading, userName }) {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">Loading report...</div>
    );
  }

  const report = {
    gaya_belajar: userReport?.gaya_belajar || "Belum tersedia",
    deskripsi: userReport?.deskripsi || "Belum ada deskripsi.",
    saran: Array.isArray(userReport?.saran)
      ? userReport.saran
      : ["Belum ada saran."],
    total_active_days: userReport?.total_active_days || 0,
    avg_study_duration: Number(userReport?.avg_study_duration || 0),
  };

  return (
    <section className="bg-gradient-to-r from-[#003b63] to-[#005a94] text-white p-8 rounded-b-xl -mt-8">
      <header className="max-w-6xl mx-auto border border-white/30 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <article className="flex-1">
          <h1 className="text-3xl font-semibold">Laporan Mingguan</h1>

          {/* SINKRON DENGAN HEADER */}
          <p className="mt-2 text-lg">Halo, {userName}</p>

          <p className="mt-1 flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
            <span>{report.gaya_belajar}</span>
          </p>

          <p className="mt-3 text-sm opacity-90">{report.deskripsi}</p>

          <ul className="mt-2 list-disc list-inside text-sm opacity-90">
            {report.saran.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </article>

        <aside className="bg-white/20 backdrop-blur p-4 rounded-xl w-44 text-center border border-white/30 flex flex-col gap-2">
          <p className="text-sm font-medium">
            {report.total_active_days} hari aktif belajar
          </p>
          <p className="text-sm font-medium">
            {report.avg_study_duration.toFixed(1)} menit rata-rata belajar
          </p>
        </aside>
      </header>
    </section>
  );
}
