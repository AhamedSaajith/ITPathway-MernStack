import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-blue-500 font-semibold">
        Loading profile...
      </div>
    );

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-30 backdrop-blur-lg border border-gray-200 max-w-2xl w-full p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          👤 My Account
        </h1>

        <div className="space-y-6 text-gray-800">
          <div>
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-md">{user.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-md">{user.email}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/edit-account")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition shadow"
          >
            ✏️ Edit Account
          </button>
          <button
            onClick={() => navigate("/change-password")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-medium transition shadow"
          >
            🔐 Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
