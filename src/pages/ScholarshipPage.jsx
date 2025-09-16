import React from "react";
import ScholarshipList from "../components/scholarships/ScholarshipList";
import ScholarshipInquiryForm from "../components/scholarships/ScholarshipInquiryForm";
import ScholarshipSeeder from "../components/scholarships/ScholarshipSeeder";

const ScholarshipPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
            Find Your Scholarship
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Explore funding opportunities from universities and organizations
            around the world.
          </p>
        </div>
      </header>
      <main>
        {/* This seeder is for development only and can be removed for production */}
        {process.env.NODE_ENV === "development" && <ScholarshipSeeder />}

        <ScholarshipList />
        <ScholarshipInquiryForm />
      </main>
    </div>
  );
};

export default ScholarshipPage;
