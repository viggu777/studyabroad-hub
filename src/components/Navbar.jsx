import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu } from "react-icons/fi";

export default function Navbar() {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsMobileMenuOpen(false); // Close menu on logout
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `relative group px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "text-yellow-400"
        : "text-gray-300 hover:text-yellow-400 hover:bg-slate-600/50"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
      isActive
        ? "bg-slate-900 text-yellow-400"
        : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  StudyAbroad
                </span>
                <span className="text-white">Hub</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-baseline space-x-8">
            <NavLink to="/" className={navLinkClasses}>
              <span>Home</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/listings" className={navLinkClasses}>
              <span>Listings</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/tools" className={navLinkClasses}>
              <span>Tools</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/counseling" className={navLinkClasses}>
              <span>Counseling</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            {currentUser && userRole === "admin" && (
              <NavLink to="/dashboard" className={navLinkClasses}>
                <span>Dashboard</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>
            )}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg ring-2 ring-yellow-400/30">
                  <span className="text-sm font-bold text-white">
                    {currentUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-red-500/20 border border-gray-600 hover:border-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-yellow-400 p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/listings"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Listings
              </NavLink>
              <NavLink
                to="/tools"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Tools
              </NavLink>
              <NavLink
                to="/counseling"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Counseling
              </NavLink>
              {currentUser && userRole === "admin" && (
                <NavLink
                  to="/dashboard"
                  className={mobileNavLinkClasses}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
              )}
            </div>
            {/* Mobile User Section */}
            <div className="pt-4 pb-3 border-t border-slate-700">
              <div className="px-5">
                {currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center ring-2 ring-yellow-400/30">
                        <span className="text-sm font-bold text-white">
                          {currentUser.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          {currentUser.displayName || "User"}
                        </div>
                        <div className="text-sm font-medium text-gray-400">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-red-400 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-red-500/20 border border-gray-600 hover:border-red-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-5 py-2.5 bg-yellow-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 transition-all"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
