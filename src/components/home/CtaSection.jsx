// src/components/home/CtaSection.jsx

import React from "react";

const CtaSection = () => {
  return (
    <section className="bg-gray-900">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to Start Your Journey?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          Join thousands of students who have found their perfect university
          match through our platform.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/auth"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-md text-gray-900 bg-yellow-1000 hover:bg-yellow-600"
          >
            Create Free Account
          </a>
          <a
            href="/counseling"
            className="inline-flex items-center justify-center px-5 py-3 border-2 border-yellow-500 text-base font-bold rounded-md text-yellow-500 hover:bg-yellow-1000 hover:text-gray-900 transition-colors"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
