import React from "react";

export default function Report({ userReport, loading, userName }) {
  if (loading) {
    return (
      <section className="relative bg-[#003b63] text-white p-8 rounded-b-3xl -mt-8 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-md bg-white/10 animate-pulse">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="h-8 w-56 bg-white/30 rounded-md" />
              <div className="h-5 w-40 bg-white/20 rounded-md" />
              <div className="h-9 w-32 bg-white/25 rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="h-20 w-28 rounded-xl bg-white/25" />
              <div className="h-20 w-28 rounded-xl bg-white/25" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const report = {
    gaya_belajar: userReport?.gaya_belajar || "Belum tersedia",
    total_active_days: userReport?.total_active_days || 0,
    avg_study_duration: Number(userReport?.avg_study_duration || 0),
  };

  return (
    <section className="relative bg-[#003b63] text-white p-8 rounded-b-3xl -mt-8 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <header className="relative max-w-6xl mx-auto border border-white/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 backdrop-blur-md bg-white/10">
        <article className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Laporan Mingguan
          </h1>

          <p className="mt-2 text-lg opacity-90">
            Halo, <span className="font-semibold">{userName}</span>
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-sm font-semibold">
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
          </div>
        </article>

        <aside className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/20 border border-white/30 backdrop-blur">
            <span className="text-2xl font-bold">
              {report.total_active_days}
            </span>
            <span className="text-xs opacity-80 mt-1 text-center">
              Hari aktif belajar
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/20 border border-white/30 backdrop-blur">
            <span className="text-2xl font-bold">
              {report.avg_study_duration.toFixed(1)}
            </span>
            <span className="text-xs opacity-80 mt-1 text-center">
              Menit / sesi
            </span>
          </div>
        </aside>
      </header>
    </section>
  );
}
