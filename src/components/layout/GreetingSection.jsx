import React from "react";

export default function GreetingSection({
  userName = "User",
  subscriptionStatus = "berakhir",
}) {
  return (
    <section className="w-full bg-gradient-to-r from-[#0c3c60] to-[#003f72] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold break-words">
            Selamat datang {userName}!
          </h1>
          <p className="text-sm md:text-base opacity-90 mt-1 break-words">
            Semoga aktivitas belajarmu menyenangkan.
          </p>
        </div>
        <article className="bg-white text-black w-full p-4 rounded-xl shadow-md border border-black/10">
          <h2 className="font-bold mb-4 text-base md:text-lg">
            Status Langganan
          </h2>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-2 w-full md:w-3/4">
              <div className="w-5 h-5 bg-gray-200 rounded-md flex-none shrink-0 flex items-center justify-center text-white text-xs"></div>

              <p className="text-sm md:text-base leading-normal break-words">
                Langganan telah {subscriptionStatus}. Berlangganan kembali untuk
                melanjutkan aktivitas belajar Anda.
              </p>
            </div>
            <button className="w-full md:w-auto bg-[#033E5F] text-white px-4 py-2 rounded-">
              Lanjut Berlangganan
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
