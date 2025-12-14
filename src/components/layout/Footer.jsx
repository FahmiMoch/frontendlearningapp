import React from "react";

export default function Footer() {
  return (
    <footer className="text-sm text-gray-600 py-6 border-t">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center md:justify-between gap-2">
        <p className="text-center md:text-left">
          © 2025 Dicoding Indonesia | Dicoding is a trademark of PT
          Presentologics.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-blue-600 no-underline hover:no-underline">
            Terms
          </a>
          <a href="#" className="text-blue-600 no-underline hover:no-underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
