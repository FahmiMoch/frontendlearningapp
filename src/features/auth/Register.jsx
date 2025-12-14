import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/auth";

const Register = () => {
  const [form, setForm] = useState({
    display_name: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    user_role: 1, // 1 = student, default
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // jika user_role, convert ke angka
    setForm({ ...form, [name]: name === "user_role" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting form:", form); // cek payload sebelum submit

      const { user } = await registerUser(form);

      if (!user) throw new Error("User tidak ditemukan");

      // simpan user ke localStorage (opsional, untuk greet)
      localStorage.setItem("user", JSON.stringify(user));

      const displayName = user.display_name || "User";

      alert(`Akun berhasil dibuat. Selamat datang, ${displayName}!`);
      navigate("/login"); // redirect ke login setelah register
    } catch (err) {
      console.error("Register failed:", err.message || err);
      alert(err.message || "Register gagal, periksa data input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[600px] bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Daftar Akun</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="display_name"
            placeholder="Nama Tampilan"
            value={form.display_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            name="phone"
            placeholder="No. Telepon"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="number"
            name="user_role"
            value={form.user_role}
            onChange={handleChange}
            placeholder="User Role (contoh: 1)"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full bg-[#0D375F] hover:bg-[#0B2F50] text-white font-medium py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
