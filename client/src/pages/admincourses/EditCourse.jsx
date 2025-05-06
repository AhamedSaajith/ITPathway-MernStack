import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          title: res.data.title,
          description: res.data.description,
          link: res.data.link,
        });
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to load course data.");
      }
    };

    fetchCourse();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`http://localhost:5001/api/courses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course updated successfully!");
      navigate("/viewcourses");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update course.");
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
      <div className="max-w-2xl mx-auto bg-white bg-opacity-30 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/viewcourses")}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full -ml-16">
            ✏️ Edit Course
          </h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Course Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-all"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
