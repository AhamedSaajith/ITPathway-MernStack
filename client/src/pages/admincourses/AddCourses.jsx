import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5001/api/courses", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course added successfully!");
      navigate("/viewcourses");
    } catch (err) {
      console.error("Course creation failed:", err);
      setError(err.response?.data?.message || "Failed to add course");
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-6 font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-xl mx-auto bg-white bg-opacity-30 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-center text-gray-800 w-full -ml-12">
            ➕ Add New Course
          </h2>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-800 font-medium">Course Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Full Stack Development"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the course..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-medium">Course Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/course"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
