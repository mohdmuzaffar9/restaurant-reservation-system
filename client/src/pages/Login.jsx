import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { saveToken } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);

      saveToken(data.token);

      login(data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      setError(
        error.response?.data?.message || "Login failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login to manage your restaurant reservations.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Error */}

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </section>
  );
}

export default Login;