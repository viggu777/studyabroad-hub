import React from "react";
import { FiUser, FiMail, FiPhone, FiSave } from "react-icons/fi";

const EditProfile = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              defaultValue="Ananya Sharma"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              defaultValue="ananya.sharma@email.com"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FiSave className="mr-2" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
