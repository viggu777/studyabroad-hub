import React, { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";

const initialVisaChecklist = [
  { id: 1, text: "Passport Application/Renewal", completed: true },
  { id: 2, text: "Acceptance Letter (I-20/CAS) Received", completed: true },
  { id: 3, text: "Financial Documents Prepared", completed: true },
  { id: 4, text: "Visa Fee Paid", completed: false },
  { id: 5, text: "Embassy Interview Scheduled", completed: false },
  { id: 6, text: "Travel & Health Insurance", completed: false },
];

const VisaTracker = () => {
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FiCheckSquare className="mr-3 text-yellow-500" /> Visa Checklist
      </h2>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
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
            className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50"
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
  );
};

export default VisaTracker;
