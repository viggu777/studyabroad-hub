import React from "react";
import { FiBookmark } from "react-icons/fi";

const savedPrograms = [
  {
    id: 1,
    name: "B.A. in Economics",
    university: "London School of Economics",
  },
  { id: 2, name: "Ph.D. in Physics", university: "MIT" },
  {
    id: 3,
    name: "Master of Public Health",
    university: "Johns Hopkins University",
  },
];

const SavedPrograms = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FiBookmark className="mr-3 text-yellow-500" /> My Saved Programs
      </h2>
      <div className="space-y-4">
        {savedPrograms.map((program) => (
          <div
            key={program.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div>
              <p className="font-semibold text-gray-800">{program.name}</p>
              <p className="text-sm text-gray-500">{program.university}</p>
            </div>
            <button className="px-4 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPrograms;
