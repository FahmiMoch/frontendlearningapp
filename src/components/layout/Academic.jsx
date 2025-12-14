import React from "react";

export default function Academic({ loading }) {
  return (
    <article className="bg-white p-4 rounded-xl shadow-md min-h-[400px]">
      <h2 className="font-semibold mb-3 flex items-center gap-2 text-base md:text-lg">
        <span className="w-5 h-5 bg-gray-200 rounded-md inline-block" />
        Academic Programs
      </h2>

      <div className="h-px bg-gray-200 w-full mb-4" />

      {loading ? (
        <div className="bg-gray-200 p-4 rounded w-full h-16 animate-pulse">
          <div className="h-3 w-3/4 bg-gray-300 rounded mb-2" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded text-sm text-gray-700 w-full h-16"></div>
      )}
    </article>
  );
}
