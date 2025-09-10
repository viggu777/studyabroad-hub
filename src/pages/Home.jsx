// src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PopularCourses from "../components/home/PopularCourses";
import FeaturedUniversities from "../components/home/FeaturedUniversities";
import CtaSection from "../components/home/CtaSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FeaturedUniversities />
      <PopularCourses />
      <CtaSection />
    </div>
  );
};

export default Home;
