import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-12 px-6 font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition font-semibold"
          >
            ← Back to Dashboard
          </button>

          <h2 className="text-3xl font-extrabold text-yellow-400 text-center flex-1">
            📚 View Courses
          </h2>

          <button
            onClick={() => navigate("/addcourses")}
            className="bg-gray-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition font-semibold"
          >
            ➕ Add Course
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left text-gray-800">
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
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={course._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold">{course.title}</td>
                    <td className="px-4 py-3 text-gray-700">{course.description}</td>
                    <td className="px-4 py-3 text-blue-600 hover:underline break-words">
                      <a href={course.link} target="_blank" rel="noopener noreferrer">
                        {course.link}
                      </a>
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/editcourse/${course._id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
