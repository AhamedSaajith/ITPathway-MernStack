import React, { useEffect, useState } from "react";
import axios from "axios";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-6 font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgb(5, 26, 83), rgb(2, 41, 96), rgb(235, 237, 241))",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-12 flex items-center justify-center gap-3">
          📚 <span>Explore Courses</span>
        </h1>

        {courses.length === 0 ? (
          <div className="text-center text-gray-300 text-lg font-medium">
            No courses found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-blue-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-2 hover:text-blue-900 transition-colors duration-200">
                    {course.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-center">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-gray-800 text-white text-sm px-6 py-2 rounded-full font-medium shadow transition-all duration-300"
                  >
                    🔗 Visit Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
