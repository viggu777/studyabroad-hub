import React from "react";
import { FiFileText, FiBookmark, FiCheckSquare } from "react-icons/fi";

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

const StatusBadge = ({ status }) => {
  const styles = {
    Accepted: "bg-green-100 text-green-800",
    Submitted: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

const StudentOverview = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Applications Submitted</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Programs Saved</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Visa Checklist</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">60% Complete</p>
        </div>
      </div>

      {/* Applications Tracker Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FiFileText className="mr-3 text-yellow-500" /> Application Status
          Tracker
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">University</th>
                <th className="p-4 font-semibold text-gray-600">Course</th>
                <th className="p-4 font-semibold text-gray-600">Applied On</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
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
    </div>
  );
};

export default StudentOverview;
