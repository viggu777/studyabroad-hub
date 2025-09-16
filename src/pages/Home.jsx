// src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PopularCourses from "../components/home/PopularCourses";
import FeaturedUniversities from "../components/home/FeaturedUniversities";
import CtaSection from "../components/home/CtaSection";
import UniversityUpdates from "../components/home/UniversityUpdates";
import InquiryForm from "../components/InquiryForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PopularCourses />
      <FeaturedUniversities />
      <UniversityUpdates />
      <InquiryForm />
      <CtaSection />
    </div>
  );
};

export default Home;
