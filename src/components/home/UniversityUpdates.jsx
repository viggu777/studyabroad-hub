import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Placeholder image. Replace with an actual image if you have one.
const placeholderImage =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const UniversityUpdates = () => {
  const [newsTab, setNewsTab] = useState("news");
  const [isHovered, setIsHovered] = useState(false);

  const newsData = [
    {
      text: "University of Toronto awarded top ranking for engineering program.",
      link: "#",
    },
    {
      text: "UCLA reveals breakthrough in renewable energy research.",
      link: "#",
    },
    { text: "MIT student startup secures major funding round.", link: "#" },
    {
      text: "Oxford faculty member receives prestigious national award.",
      link: "#",
    },
  ];

  const alertsData = [
    {
      text: "Campus library will be closed on Sept 25th for maintenance.",
      link: "#",
    },
    {
      text: "Application deadlines for Spring 2026 intake approaching.",
      link: "#",
    },
    { text: "Virtual career fair scheduled for November 20th.", link: "#" },
    { text: "Important security update for all student portals.", link: "#" },
  ];

  const blogsData = [
    {
      text: "Navigating your first semester abroad with confidence.",
      link: "#",
    },
    { text: "How to write a Statement of Purpose that stands out.", link: "#" },
    {
      text: "Five ways to get involved in campus life at a foreign university.",
      link: "#",
    },
    {
      text: "The importance of mental health for international students.",
      link: "#",
    },
  ];

  const data = { news: newsData, alerts: alertsData, blogs: blogsData };

  const scrollVariants = {
    animate: {
      y: ["0%", "-100%"],
      transition: {
        y: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
    pause: { y: null },
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section: News/Alerts/Blogs */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-extrabold text-white mb-6">
              Latest Updates from Global Universities
            </h2>

            {/* Tabs */}
            <div className="flex bg-slate-800 rounded-t-xl overflow-hidden shadow-md border-b-2 border-slate-700">
              {["news", "alerts", "blogs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNewsTab(tab)}
                  className={`flex-1 px-4 py-3 font-semibold text-sm transition-all duration-300 ${
                    newsTab === tab
                      ? "bg-yellow-500 text-slate-900"
                      : "bg-transparent text-gray-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div
              className="bg-slate-800 p-4 h-64 overflow-hidden relative rounded-b-xl shadow-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={newsTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-4"
                >
                  <motion.div
                    variants={scrollVariants}
                    animate={isHovered ? "pause" : "animate"}
                  >
                    {[...data[newsTab], ...data[newsTab]].map(
                      (
                        item,
                        idx // Duplicate for seamless scroll
                      ) => (
                        <div
                          key={idx}
                          className="py-2 border-b border-dotted border-slate-700 last:border-0"
                        >
                          <a
                            href={item.link}
                            className="text-gray-300 hover:text-yellow-400 transition-colors block leading-tight"
                          >
                            {item.text}
                          </a>
                        </div>
                      )
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300 flex items-center gap-2 shadow-lg"
            >
              <span>View All Updates</span>
              <FiArrowRight />
            </motion.button>
          </div>

          {/* Right Section: Featured Post */}
          <div className="lg:w-1/3">
            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700">
              <img
                className="w-full h-64 object-cover"
                src={placeholderImage}
                alt="Students graduating"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  A Student's Guide to Choosing the Right University
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Making one of the biggest decisions of your life? Our latest
                  blog post breaks down the key factors to consider, from course
                  curriculum to campus culture.
                </p>
                <a
                  href="#"
                  className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors flex items-center"
                >
                  Read More <FiArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityUpdates;
