import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png"; // Update the path if needed

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
   
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData({ ...formData, confirmPassword });
    setPasswordMatch(formData.password === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/user", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message || "Registration successful!");
      navigate("/");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
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
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordMatch === false && (
              <small className="block mt-1 text-red-500 font-semibold">
                Passwords do not match!
              </small>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/" className="text-gray-800 font-medium hover:underline">
              Login Here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
