import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../../services/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, token, refreshToken } = await loginUser(
        form.email,
        form.password,
      );

      if (!user) throw new Error("Akun tidak ditemukan");

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user || {}));

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message || "Email atau password salah");
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
        <div className="fixed top-6 right-6 z-50 bg-white border border-green-200 shadow-lg rounded-xl px-5 py-4 flex items-center gap-3 animate-slide-in">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Login berhasil
            </p>
            <p className="text-xs text-slate-500">
              Mengalihkan ke dashboard...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 min-h-[560px] flex flex-col justify-between">
        <div>
          <img
            src="/dicoding-logos.png"
            alt="Dicoding Logo"
            className="w-36 mx-auto mb-8"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
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
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42M9.88 4.24A10.94 10.94 0 0 1 12 4.5c4.64 0 8.57 3 9.96 7.5a11.06 11.06 0 0 1-4.3 5.77M6.23 6.23A11.05 11.05 0 0 0 2.04 12c1.39 4.5 5.32 7.5 9.96 7.5a10.9 10.9 0 0 0 4.12-.8"
                    />
                  </svg>
                ) : (
                  /* EYE */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.04 12c1.39-4.5 5.32-7.5 9.96-7.5s8.57 3 9.96 7.5c-1.39 4.5-5.32 7.5-9.96 7.5S3.43 16.5 2.04 12z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D375F] hover:bg-[#0B2F50] text-white font-semibold py-3.5 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
        <div>
          <div className="flex items-center my-6 gap-3">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="text-slate-500 text-sm">atau</span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          <button className="w-full border border-slate-300 rounded-lg bg-slate-50 py-3 flex items-center justify-center gap-3 hover:bg-slate-100">
            <img src="/google-logos.png" alt="Google" className="w-5" />
            <span className="text-sm font-medium">Masuk dengan Google</span>
          </button>

          <p className="mt-6 text-sm text-slate-600 text-center">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-[#0D375F] font-semibold hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
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
