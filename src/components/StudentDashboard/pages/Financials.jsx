import React from "react";
import { FiDollarSign } from "react-icons/fi";

const scholarships = [
  { id: 1, name: "Global Achiever Scholarship", status: "Applied" },
  { id: 2, name: "Commonwealth Scholarship", status: "Pending" },
  { id: 3, name: "University Merit Award", status: "Awarded" },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Awarded: "bg-green-100 text-green-800",
    Applied: "bg-blue-100 text-blue-800",
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

const Financials = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FiDollarSign className="mr-3 text-yellow-500" /> Financials &
        Scholarships
      </h2>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">
          Applied Scholarships
        </h3>
        <div className="space-y-3">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg"
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
  );
};

export default Financials;
