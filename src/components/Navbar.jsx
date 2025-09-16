import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu, FiGlobe } from "react-icons/fi";
import AccountMenu from "./AccountMenu"; // Import the AccountMenu component

export default function Navbar() {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const accountMenuRef = useRef(null);

  // Close account menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsMobileMenuOpen(false);
      setIsAccountMenuOpen(false);
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
                <span className="bg-yellow-500 bg-clip-text text-transparent">
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
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/universities" className={navLinkClasses}>
              <span>Universities</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/courses" className={navLinkClasses}>
              <span>Courses</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/tools" className={navLinkClasses}>
              <span>Tools</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            <NavLink to="/counseling" className={navLinkClasses}>
              <span>Counseling</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
            {currentUser && userRole === "admin" && (
              <NavLink to="/dashboard" className={navLinkClasses}>
                <span>Dashboard</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>
            )}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg ring-2 ring-yellow-400/30 focus:outline-none focus:ring-yellow-400"
                >
                  <span className="text-sm font-bold text-white">
                    {currentUser.email.charAt(0).toUpperCase()}
                  </span>
                </button>
                <AnimatePresence>
                  {isAccountMenuOpen && <AccountMenu onLogout={handleLogout} />}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
            <div className="pt-4 pb-3 border-t border-slate-700">
              <div className="px-5">
                {currentUser ? (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/user-dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center"
                    >
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
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-700/50 hover:text-white"
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
