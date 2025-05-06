import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-6"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-extrabold text-yellow-400 text-center flex-1">
            🛠️ View Projects
          </h2>
          <button
            onClick={() => navigate("/addproject")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Project
          </button>
        </div>

        <div className="overflow-x-auto bg-white bg-opacity-30 backdrop-blur-md shadow-xl rounded-xl border border-gray-200">
          <table className="w-full text-sm text-gray-800">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr
                    key={project._id}
                    className="border-t border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold">{project.title}</td>
                    <td className="px-4 py-3 max-w-xs break-words">{project.description}</td>
                    <td className="px-4 py-3 break-words text-blue-700 underline">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/editproject/${project._id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
