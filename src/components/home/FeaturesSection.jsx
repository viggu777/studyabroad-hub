// src/components/home/FeaturesSection.jsx

import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      title: "University Explorer",
      description:
        "Browse thousands of universities worldwide with detailed profiles, rankings, and admission requirements.",
      gradient: "from-yellow-500 to-yellow-500",
      bgColor: "bg-white",
      borderColor: "border-yellow-200",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
          />
        </svg>
      ),
      title: "Scholarship Finder",
      description:
        "Find personalized scholarships and funding opportunities matching your profile and goals.",
      gradient: "from-amber-500 to-yellow-600",
      bgColor: "bg-white",
      borderColor: "border-amber-200",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Cost Calculator",
      description:
        "Calculate tuition, living expenses, and total costs for studying in different countries.",
      gradient: "bg-gray-500",
      bgColor: "bg-white",
      borderColor: "border-yellow-200",
    },
  ];

  return (
    <section className="py-5 bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Everything You Need in One Place
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${feature.bgColor} border-2 ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              <div
                className={`flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
