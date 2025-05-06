import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import logo from "../../assets/images/logo.png"; // Update the path if needed

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("Logged out successfully!");
    navigate("/");
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
      <div className="w-full max-w-2xl bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-gray-200 relative">
        {/* Logo and Logout */}
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="ITPathway Logo" className="h-10" />
          <Logout
            onClick={handleLogout}
            className="text-red-600 cursor-pointer hover:scale-110 transition"
            fontSize="large"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Courses Section */}
          <div className="flex items-center justify-between bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Manage Courses</h2>
            <button
              onClick={() => navigate("/viewcourses")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Courses
            </button>
          </div>

          {/* Projects Section */}
          <div className="flex items-center justify-between bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Manage Projects</h2>
            <button
              onClick={() => navigate("/viewprojects")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
