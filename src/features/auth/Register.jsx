import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/auth";

export default function Register() {
  const [form, setForm] = useState({
    display_name: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    user_role: 1,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user } = await registerUser(form);
      if (!user) throw new Error("Registrasi gagal");

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Register gagal, periksa data input");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-4 py-3.5 " +
    "focus:outline-none focus:ring-2 focus:ring-[#0D375F] focus:border-[#0D375F]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 relative">
      {success && (
        <div
          className="
          fixed top-6 right-6 z-50
          bg-white border border-green-200
          shadow-lg rounded-xl px-5 py-4
          flex items-center gap-3
          animate-slide-in
        "
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Registrasi berhasil
            </p>
            <p className="text-xs text-slate-500">
              Mengalihkan ke halaman login...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 min-h-[620px] flex flex-col justify-between">
        <div>
          <img
            src="/dicoding-logos.png"
            alt="Dicoding Logo"
            className="w-36 mx-auto mb-8"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="display_name"
              placeholder="Nama Tampilan"
              value={form.display_name}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
                required
              />

              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? (
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12
                      C3.226 16.338 7.244 19.5 12 19.5
                      c.993 0 1.953-.138 2.863-.395M6.228 6.228
                      A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498
                      a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228
                      3 3m3.228 3.228 12.544 12.544"
                    />
                  </svg>
                ) : (
                  /* Eye */
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639
                      C3.423 7.51 7.36 4.5 12 4.5
                      c4.638 0 8.573 3.007 9.963 7.178
                      .07.207.07.431 0 .639
                      C20.577 16.49 16.64 19.5 12 19.5
                      c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="No. Telepon"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D375F] hover:bg-[#0B2F50] text-white font-semibold py-3.5 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-slate-600 text-center">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-[#0D375F] font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
      <style>
        {`
          @keyframes slide-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}
