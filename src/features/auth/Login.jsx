import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../../services/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token, refreshToken } = await loginUser(
        form.email,
        form.password,
      );

      if (!user) throw new Error("User tidak ditemukan");

      // Simpan token & refreshToken
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Simpan user ke localStorage secara aman
      localStorage.setItem("user", JSON.stringify(user || {}));

      const displayName = user.display_name || "User";

      alert(`Selamat datang, ${displayName}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.message || err);
      alert(err.message || "Login gagal, periksa email/password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[600px] bg-white p-8 rounded-2xl shadow-lg min-h-[700px] flex flex-col justify-between">
        <img
          src="/dicoding-logos.png"
          alt="Dicoding Logo"
          className="w-40 mx-auto mb-6"
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0D375F] hover:bg-[#0B2F50] text-white font-medium py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="flex items-center my-6 gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">atau</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="w-full border border-gray-300 rounded-md bg-gray-50 py-3 flex items-center justify-center gap-3 hover:bg-gray-100">
          <img src="/google-logos.png" alt="Google" className="w-5" />
          <span className="text-sm font-medium">Masuk dengan Google</span>
        </button>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
