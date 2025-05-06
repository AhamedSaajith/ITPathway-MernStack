import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "../accountmenu/AccountMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <div className="flex items-center space-x-1 text-2xl font-extrabold uppercase tracking-wide">
              <span className="text-yellow-400">IT</span>
              <span className="text-white">Pathway</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLinks isActive={isActive} navigate={navigate} />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <NavLinks
            isActive={isActive}
            navigate={navigate}
            mobile
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

// ✅ Extracted Navigation Links
function NavLinks({ isActive, navigate, mobile = false, onClose }) {
  const linkClass = (path) =>
    `cursor-pointer block py-1 ${
      isActive(path)
        ? "text-yellow-400 font-semibold"
        : "text-white hover:text-yellow-400"
    } transition duration-300`;

  const handleClick = (path) => {
    navigate(path);
    if (mobile && onClose) onClose();
  };

  return (
    <>
      <div className={linkClass("/home")} onClick={() => handleClick("/home")}>
        Home
      </div>
      <div className={linkClass("/courses")} onClick={() => handleClick("/courses")}>
        Courses
      </div>
      <div className={linkClass("/projects")} onClick={() => handleClick("/projects")}>
        Projects
      </div>
      <div className={linkClass("/chatbot")} onClick={() => handleClick("/chatbot")}>
        Career Assistance
      </div>
      <div className={linkClass("/cv")} onClick={() => handleClick("/cv")}>
        CV
      </div>
      
      <div className="pt-1">
        <AccountMenu />
      </div>
    </>
  );
}
