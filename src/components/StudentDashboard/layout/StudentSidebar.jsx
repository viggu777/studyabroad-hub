import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBookmark,
  FiFileText,
  FiCheckSquare,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";

const StudentSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-yellow-500 text-white shadow-md" : "hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white p-4 h-screen sticky top-0 border-r">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-yellow-600">Student Hub</h2>
      </div>
      <nav className="space-y-2">
        {/* --- FIX: Changed all 'to' props to be relative paths --- */}
        <NavLink to="overview" className={navLinkClasses}>
          <FiGrid className="mr-3" /> Overview
        </NavLink>
        <NavLink to="saved-programs" className={navLinkClasses}>
          <FiBookmark className="mr-3" /> Saved Programs
        </NavLink>
        <NavLink to="visa-tracker" className={navLinkClasses}>
          <FiCheckSquare className="mr-3" /> Visa Checklist
        </NavLink>
        <NavLink to="financials" className={navLinkClasses}>
          <FiDollarSign className="mr-3" /> Financials
        </NavLink>
        <NavLink to="profile" className={navLinkClasses}>
          <FiUser className="mr-3" /> Edit Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
