import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading indicator while the authentication state is being determined
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    // If the user is not logged in, redirect them to the authentication page.
    // We save the location they were trying to access to redirect them back after login.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If the route requires specific roles, check if the user has one of them.
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    // If the user is logged in but their role is not in the allowed list,
    // redirect them to an "Unauthorized" page.
    return <Navigate to="/unauthorized" replace />;
  }

  // If the user is logged in and has the required role (or if no specific role is required),
  // grant access to the requested page.
  return children;
};

export default ProtectedRoute;
