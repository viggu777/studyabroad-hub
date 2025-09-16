import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AccountMenu = ({ onLogout }) => {
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl"
    >
      <div className="p-2">
        <Link
          to="/user-dashboard/overview"
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-slate-700 hover:text-white"
        >
          My Dashboard
        </Link>
        <Link
          to="/user-dashboard/saved-programs"
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-slate-700 hover:text-white"
        >
          Saved Programs
        </Link>
        <Link
          to="/user-dashboard/profile"
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-slate-700 hover:text-white"
        >
          Edit Profile
        </Link>
        <div className="my-2 border-t border-slate-700"></div>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/20 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default AccountMenu;
