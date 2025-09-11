// src/components/home/CtaSection.jsx

import React from "react";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="relative max-w-5xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
          <span className="block">Ready to Start Your Journey?</span>
        </h2>
        <p className="text-xl leading-relaxed text-yellow-100 max-w-2xl mx-auto mb-12">
          Join thousands of students who have found their perfect university
          match through our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="/auth"
            className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white text-lg font-bold rounded-xl hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            Create Free Account
            <svg
              className="ml-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="/counseling"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-400 text-lg font-bold rounded-xl text-yellow-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            Book Consultation
            <svg
              className="ml-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </a>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-yellow-500 to-yellow-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </section>
  );
};
export default CtaSection;
