import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          title: res.data.title,
          description: res.data.description,
          link: res.data.link,
        });
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project data.");
      }
    };

    fetchProject();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`http://localhost:5001/api/projects/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Project updated successfully!");
      navigate("/viewprojects");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update project.");
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
            onClick={() => navigate("/viewprojects")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition font-medium"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-center text-gray-800 w-full">
            ✏️ Edit Project
          </h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-800 font-medium">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. IT Career Assistant"
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
              placeholder="Brief description of the project..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-medium">Project Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/yourproject"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-300"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
