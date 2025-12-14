import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function ChartSection({ range, setRange, userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // FETCH CHART DATA (SNAPSHOT PER HARI)
  // =====================================================
  const fetchData = useCallback(async () => {
    if (!userId) {
      setData([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.teamcs222.my.id/api/ml-predictions/user/${userId}`,
      );

      const items = res.data?.data || [];

      const normalized = items
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(-range)
        .map((item) => ({
          dayLabel: new Date(item.created_at).toLocaleDateString("id-ID", {
            weekday: "short",
          }),
          value: Number(item.avg_study_duration || 0),
        }));

      setData(normalized);
    } catch (err) {
      console.error("Failed to fetch chart data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [userId, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = useMemo(() => data, [data]);

  return (
    <section className="max-w-6xl mx-auto bg-white p-6 rounded-xl mt-10 shadow">
      <header>
        <h2 className="font-semibold mb-1">Kegiatan Pembelajaran</h2>
        <p className="text-sm text-gray-600 mb-4">
          Durasi belajar rata-rata per hari
        </p>
      </header>

      <div className="flex gap-3 mb-5 justify-end">
        {[7, 14, 30].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-lg border transition ${
              range === r
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {r} Hari
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading chart...</div>
      ) : chartData.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          Belum ada data pembelajaran
        </div>
      ) : (
        <figure className="w-full h-64 min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 15, left: -10 }}
            >
              <CartesianGrid
                stroke="#e5e5e5"
                strokeDasharray="3 3"
                vertical={false}
              />

              {/* 🔧 FIX DI SINI */}
              <XAxis
                dataKey="dayLabel"
                scale="band"
                interval={0}
                tick={{ fontSize: 12, fill: "#666", dy: 8 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#666" }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [`${value} menit`, "Durasi"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#0052D5"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </figure>
      )}
    </section>
  );
}
