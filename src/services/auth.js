import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { user, accessToken, refreshToken } = response.data?.data || {};

    if (!accessToken || !user)
      throw new Error("Login gagal, token/user tidak ditemukan");

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { user, token: accessToken, refreshToken };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Login gagal";
    console.error("Login error:", message);
    throw new Error(message);
  }
};

export const register = async ({
  display_name,
  name,
  email,
  password,
  phone,
  user_role,
}) => {
  try {
    const response = await api.post("/auth/register", {
      display_name,
      name,
      email,
      password,
      phone,
      user_role,
    });

    const user = response.data?.data;
    if (!user) throw new Error("Register gagal, user tidak ditemukan");

    localStorage.setItem("user", JSON.stringify(user));

    return { user };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Register gagal";
    console.error("Register error:", message);
    throw new Error(message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
