// src/components/home/HeroSection.jsx

import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-yellow-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Discover Your Dream{" "}
          <span className="text-yellow-600">University</span> Worldwide
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Explore top universities, find perfect courses, discover scholarships,
          and get complete support for your international education journey.
        </p>
        <div className="mt-10 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full flex-1 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200 pr-4">
            <svg
              className="h-6 w-6 text-gray-400 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search universities or courses"
              className="w-full focus:outline-none"
            />
          </div>
          <div className="w-full flex-1 flex items-center mt-4 sm:mt-0">
            <svg
              className="h-6 w-6 text-gray-400 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Select Country"
              className="w-full focus:outline-none"
            />
          </div>
          <button className="w-full sm:w-auto mt-4 sm:mt-0 bg-yellow-1000 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300">
            Search Programs
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
