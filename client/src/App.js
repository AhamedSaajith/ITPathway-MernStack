import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/homepage";
import Chatbot from "./pages/chatbot";
import Header from "./components/header";
import Footer from "./components/footer";
import Projects from "./pages/projects";
import Courses from "./pages/courses";

import Login from "./pages/login";
import Register from "./pages/signup";
import UserProfile from "./pages/userprofile";
import Admindashboard from "./pages/admindashboard/index";
import AddCourses from "./pages/admincourses/AddCourses";
import AdminLogin from "./pages/adminlogin";
import ViewCourses from "./pages/admincourses/ViewCourses";
import EditCourse from "./pages/admincourses/EditCourse";
import AddProject from "./pages/adminprojects/AddProjects";
import EditProject from "./pages/adminprojects/EditProjects";
import ViewProjects from "./pages/adminprojects/ViewProjects";
import CVScanner from "./pages/cvscanner/CVScanner";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

// 🔐 Helper functions
const isUserLoggedIn = () => !!localStorage.getItem("token");
const isAdminLoggedIn = () => !!localStorage.getItem("adminToken");

// 🔐 User Route Protection
function PrivateUserRoute({ children }) {
  return isUserLoggedIn() ? children : <Navigate to="/" />;
}

// 🔐 Admin Route Protection
function PrivateAdminRoute({ children }) {
  return isAdminLoggedIn() ? children : <Navigate to="/adminlogin" />;
}

// 🧠 Layout Component that conditionally renders Header/Footer
function LayoutWrapper() {
  const location = useLocation();

  const hideHeaderFooterRoutes = [
    "/",
    "/register",
    "/adminlogin",
    "/admindashboard",
    "/addcourses",
    "/viewcourses",
    "/editcourse",
    "/addproject",
    "/viewprojects",
    "/editproject",
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        {/* Public and Protected User Routes */}
        <Route
          path="/home"
          element={
            <PrivateUserRoute>
              <Home />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateUserRoute>
              <Chatbot />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateUserRoute>
              <Projects />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateUserRoute>
              <Courses />
            </PrivateUserRoute>
          }
        />

        <Route
          path="/userprofile"
          element={
            <PrivateUserRoute>
              <UserProfile />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/cv"
          element={
            <PrivateUserRoute>
              <CVScanner />
            </PrivateUserRoute>
          }
        />

        {/* Auth Pages (no protection) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admindashboard"
          element={
            <PrivateAdminRoute>
              <Admindashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/addcourses"
          element={
            <PrivateAdminRoute>
              <AddCourses />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/viewcourses"
          element={
            <PrivateAdminRoute>
              <ViewCourses />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/editcourse/:id"
          element={
            <PrivateAdminRoute>
              <EditCourse />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/addproject"
          element={
            <PrivateAdminRoute>
              <AddProject />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/viewprojects"
          element={
            <PrivateAdminRoute>
              <ViewProjects />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/editproject/:id"
          element={
            <PrivateAdminRoute>
              <EditProject />
            </PrivateAdminRoute>
          }
        />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
