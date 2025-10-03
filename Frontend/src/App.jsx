import React, { useEffect } from "react";
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
import ScholarshipPage from "./pages/ScholarshipPage"; // Import the new ScholarshipPage
import ErrorBoundary from "./components/ErrorBoundary";

import UniversityDetailPage from "./pages/UniversityDetailPage";
import CourseDetailPage from "./pages/CourseDetailPage";
// --- ADDED: Import for the Admin Dashboard page ---
import Dashboard from "./pages/Dashboard";

// --- Imports for the Student Dashboard ---
import StudentDashboardLayout from "./components/StudentDashboard/layout/StudentDashboardLayout";
import StudentOverview from "./components/StudentDashboard/pages/StudentOverview";
import SavedPrograms from "./components/StudentDashboard/pages/SavedPrograms";
import VisaTracker from "./components/StudentDashboard/pages/VisaTracker";
import Financials from "./components/StudentDashboard/pages/Financials";
import EditProfile from "./components/StudentDashboard/pages/EditProfile";

const AppInner = () => {
  const location = useLocation();

  // --- UPDATED: This now checks for both admin and user dashboards ---
  // const isDashboardRoute =
  // location.pathname.startsWith("/dashboard") ||
  // location.pathname.startsWith("/user-dashboard");

  return (
    <>
      {<Navbar />}
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

        {/* --- ADDED: The route for the Admin Dashboard --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* This route now acts as the parent for the entire student dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard page */}
          <Route index element={<Navigate to="overview" replace />} />
          {/* Nested pages for the student dashboard */}
          <Route path="overview" element={<StudentOverview />} />
          <Route path="saved-programs" element={<SavedPrograms />} />
          <Route path="visa-tracker" element={<VisaTracker />} />
          <Route path="financials" element={<Financials />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
      {<Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      {/* Assuming AuthProvider wraps your app elsewhere */}
      <AppInner />
    </Router>
  );
}

export default App;
