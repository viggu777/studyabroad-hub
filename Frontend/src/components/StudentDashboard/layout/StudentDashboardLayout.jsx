import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
