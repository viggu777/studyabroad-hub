import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiBookmark,
  FiFileText,
  FiCheckSquare,
  FiDollarSign,
} from "react-icons/fi";

// --- Mock Data (can be replaced with data from your backend) ---
const userData = {
  name: "Ananya Sharma",
  email: "ananya.sharma@email.com",
  avatarInitials: "AS",
};

const applications = [
  {
    id: 1,
    university: "University of Toronto",
    course: "M.Sc. Computer Science",
    date: "2025-08-15",
    status: "Submitted",
  },
  {
    id: 2,
    university: "University of California, Berkeley",
    course: "MBA",
    date: "2025-08-10",
    status: "Accepted",
  },
  {
    id: 3,
    university: "Imperial College London",
    course: "M.Eng. Mechanical Engineering",
    date: "2025-09-01",
    status: "Pending",
  },
];

const savedPrograms = [
  {
    id: 1,
    name: "B.A. in Economics",
    university: "London School of Economics",
  },
  { id: 2, name: "Ph.D. in Physics", university: "MIT" },
];

const initialVisaChecklist = [
  { id: 1, text: "Passport Application/Renewal", completed: true },
  { id: 2, text: "Acceptance Letter (I-20/CAS) Received", completed: true },
  { id: 3, text: "Financial Documents Prepared", completed: true },
  { id: 4, text: "Visa Fee Paid", completed: false },
  { id: 5, text: "Embassy Interview Scheduled", completed: false },
];

const scholarships = [
  { id: 1, name: "Global Achiever Scholarship", status: "Applied" },
  { id: 2, name: "Commonwealth Scholarship", status: "Pending" },
];
// --- End Mock Data ---

const StatusBadge = ({ status }) => {
  const styles = {
    Accepted: "bg-green-100 text-green-800",
    Submitted: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Applied: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default function StudentProfile() {
  const [checklist, setChecklist] = useState(initialVisaChecklist);

  const handleChecklistToggle = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const checklistProgress =
    (checklist.filter((item) => item.completed).length / checklist.length) *
    100;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {userData.avatarInitials}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
              <p className="text-gray-400">{userData.email}</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <FiEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Applications Tracker Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FiFileText className="mr-3 text-yellow-500" />
                Application Status Tracker
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">
                        University
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Course
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Applied On
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-800">
                          {app.university}
                        </td>
                        <td className="p-4 text-gray-600">{app.course}</td>
                        <td className="p-4 text-gray-600">{app.date}</td>
                        <td className="p-4">
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Saved Programs Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FiBookmark className="mr-3 text-yellow-500" />
                My Saved Programs
              </h2>
              <div className="space-y-4">
                {savedPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {program.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {program.university}
                      </p>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Visa Checklist Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FiCheckSquare className="mr-3 text-yellow-500" />
                Visa Checklist
              </h2>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-yellow-600">
                    {Math.round(checklistProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: `${checklistProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleChecklistToggle(item.id)}
                      className="h-5 w-5 rounded accent-yellow-500"
                    />
                    <span
                      className={`ml-3 text-gray-700 ${
                        item.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Financials & Scholarships Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FiDollarSign className="mr-3 text-yellow-500" />
                Financials & Scholarships
              </h2>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  Applied Scholarships
                </h3>
                <div className="space-y-3">
                  {scholarships.map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <p className="text-gray-800">{scholarship.name}</p>
                      <StatusBadge status={scholarship.status} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Financial Readiness
                </h3>
                <div className="text-center bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg">
                  <p className="font-bold text-lg">Documents Verified</p>
                  <p className="text-sm">Ready for Visa Application</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
