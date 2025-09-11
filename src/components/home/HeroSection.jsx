import React from "react";
// 1. Import your local image from the assets folder
import backgroundImage from "../../assets/campus-background.jpg";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0">
        {/* 2. Apply the imported local image using an inline style */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>

        {/* Original overlay for color */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-black-700/50 to-slate-600/70"></div>

        {/* 3. Added dark shade at the bottom */}
        {/* This gradient goes from 70% black at the bottom to transparent at the top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8 drop-shadow-2xl">
            Discover Your Dream{" "}
            <span className="bg-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
              University
            </span>{" "}
            Worldwide
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-100 leading-relaxed drop-shadow-lg">
            Explore top universities, find perfect courses, discover
            scholarships, and get complete support for your international
            education journey.
          </p>

          {/* Enhanced Search Box */}
          <div className="mt-12 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-3 flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full flex-1 flex items-center border-b lg:border-b-0 lg:border-r border-gray-200 pr-6 pb-4 lg:pb-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500  mr-4 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
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
              </div>
              <input
                type="text"
                placeholder="Search universities or courses"
                className="w-full text-lg focus:outline-none placeholder-gray-500 bg-transparent"
              />
            </div>
            <div className="w-full flex-1 flex items-center pr-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500 mr-4 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
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
              </div>
              <input
                type="text"
                placeholder="Select Country"
                className="w-full text-lg focus:outline-none placeholder-gray-500 bg-transparent"
              />
            </div>
            <button className="w-full lg:w-auto bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 transition duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Search Programs
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">✓</span>
              </div>
              <span className="text-sm font-medium">10,000+ Universities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">✓</span>
              </div>
              <span className="text-sm font-medium">50+ Countries</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">✓</span>
              </div>
              <span className="text-sm font-medium">$2B+ Scholarships</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
