import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Academy", href: "#" },
    { name: "Challenge", href: "#" },
    { name: "Event", href: "#" },
    { name: "Job", href: "#" },
    { name: "Insight", href: "/insight" },
  ];

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 lg:px-6 py-4 flex items-center gap-6">
        <img src="/dicoding-logos.png" alt="Dicoding Logo" className="w-32" />

        <ul className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="hover:text-blue-600">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ml-auto relative">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full border-[4px] border-cyan-300 text-white font-semibold text-lg select-none"></div>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-4 h-4 transition-transform ${openDropdown ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {openDropdown && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40 py-2 text-sm font-medium text-gray-700 z-30">
                <li>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Saya
                  </a>
                </li>
                <li>
                  <a
                    href="/daftar"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Daftar Pesanan
                  </a>
                </li>
                <li>
                  <a
                    href="/pengaturan"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Pengaturan
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Keluar
                  </button>
                </li>
              </ul>
            )}
          </div>
          <button
            className="relative hover:text-gray-700"
            aria-label="Notification Bell"
          >
            <FontAwesomeIcon
              icon={faBell}
              className="absolute w-6 h-6 text-black"
              style={{ transform: "scale(1.15)" }}
            />
            <FontAwesomeIcon
              icon={faBell}
              className="relative w-6 h-6 text-white"
            />
          </button>

          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon
              icon={mobileMenuOpen ? faXmark : faBars}
              className="w-6 h-6"
            />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <ul className="md:hidden bg-white shadow-md w-full px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="block hover:text-blue-600">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
