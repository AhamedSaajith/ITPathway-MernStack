import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // replace with your actual path

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="ITPathway Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login to ITPathway
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/register" className="text-gray-800 font-medium hover:underline">
              Register
            </a>
          </div>
          <div className="text-center mt-2 text-sm text-gray-700">
            <a href="/adminlogin" className="text-gray-800 font-medium hover:underline">
              Login as Admin
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
