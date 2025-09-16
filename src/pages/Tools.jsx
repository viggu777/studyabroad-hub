import React from "react";
import { Link } from "react-router-dom";

// Data for the tool cards to keep the code clean and manageable
const toolsData = [
  {
    title: "Scholarship Finder",
    description:
      "Search our extensive database of scholarships and grants to find funding opportunities that match your profile and destination.",
    ctaText: "Find Scholarships",
    path: "/scholarships",
    icon: (
      <svg
        className="h-12 w-12"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v11.494m-5.247-8.991l10.494 0M4.753 12.001l14.494 0M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </svg>
    ),
  },
  {
    title: "Loan Estimator",
    description:
      "Estimate your monthly payments and total education loan costs. Compare different loan options to make informed financial decisions.",
    ctaText: "Estimate Loan",
    path: "/tools/loan-estimator",
    icon: (
      <svg
        className="h-12 w-12"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "ROI Calculator",
    description:
      "Calculate the potential return on investment for your chosen course and university by comparing costs against expected future earnings.",
    ctaText: "Calculate ROI",
    path: "/tools/roi-calculator",
    icon: (
      <svg
        className="h-12 w-12"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    title: "Visa Roadmap",
    description:
      "Get a step-by-step checklist and guidance for the student visa application process for your destination country.",
    ctaText: "View Roadmap",
    path: "/tools/visa-roadmap",
    icon: (
      <svg
        className="h-12 w-12"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export default function Tools() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Student Toolkit
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Essential tools to help you plan your finances and application
            process for studying abroad.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {toolsData.map((tool) => (
            <div
              key={tool.title}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
            >
              <div className="flex-shrink-0 text-yellow-600">{tool.icon}</div>
              <div className="flex-grow">
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {tool.title}
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  {tool.description}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to={tool.path}
                  className="inline-block w-full text-center py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                >
                  {tool.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
