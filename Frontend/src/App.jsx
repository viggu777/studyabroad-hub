// src/pages/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import UniversitiesPage from "./pages/UniversitiesPage";
import CoursesPage from "./pages/CoursesPage";
import Tools from "./pages/Tools";
import Counseling from "./pages/Counseling";
import Auth from "./pages/Auth";
import ScholarshipPage from "./pages/ScholarshipPage";
import ErrorBoundary from "./components/ErrorBoundary";

import UniversityDetailPage from "./pages/UniversityDetailPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import Dashboard from "./pages/Dashboard";

// --- ADDED: Import the new StudentSignup component ---
import StudentSignup from "./pages/StudentSignup";

// --- Imports for the Student Dashboard ---
import StudentDashboardLayout from "./components/StudentDashboard/layout/StudentDashboardLayout";
import StudentOverview from "./components/StudentDashboard/pages/StudentOverview";
import SavedPrograms from "./components/StudentDashboard/pages/SavedPrograms";
import VisaTracker from "./components/StudentDashboard/pages/VisaTracker";
import Financials from "./components/StudentDashboard/pages/Financials";
import EditProfile from "./components/StudentDashboard/pages/EditProfile";

const AppInner = () => {
  const location = useLocation();

  return (
    <>
      <Navbar /> {/* Navbar is already included */}
      <Routes>
        {/* Your existing public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route
          path="/universities/:id"
          element={
            <ErrorBoundary>
              <UniversityDetailPage />
            </ErrorBoundary>
          }
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        <Route path="/tools" element={<Tools />} />
        <Route path="/scholarships" element={<ScholarshipPage />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/auth" element={<Auth />} />

        {/* --- ADDED: The route for the new Student Signup page --- */}
        <Route path="/signup-student" element={<StudentSignup />} />

        {/* Admin Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<StudentOverview />} />
          <Route path="saved-programs" element={<SavedPrograms />} />
          <Route path="visa-tracker" element={<VisaTracker />} />
          <Route path="financials" element={<Financials />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
      <Footer /> {/* Footer is already included */}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
