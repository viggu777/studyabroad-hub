// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or a blank screen while auth state is being determined
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // User is logged in, but their role does not match.
    // Redirect to a "Not Authorized" page or the home page.
    return <Navigate to="/" replace />;
  }

  return children; // Access granted
};

export default ProtectedRoute;
