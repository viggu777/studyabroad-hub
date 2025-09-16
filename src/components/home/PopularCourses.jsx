// src/components/home/PopularCourses.jsx

import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";

const PopularCourses = () => {
  // State to hold fetched courses and loading status
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch course data from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const q = query(coursesCollection, limit(4));
        const courseSnapshot = await getDocs(q);
        const courseList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const courseColors = [
    {
      gradient: "bg-yellow-500",
      bg: "bg-gray-100",
      border: "border-yellow-200",
    },
    {
      gradient: "bg-yellow-500",
      bg: "bg-gray-100",
      border: "border-amber-200",
    },
    {
      gradient: "bg-yellow-500",
      bg: "bg-gray-100",
      border: "border-yellow-200",
    },
    {
      gradient: "bg-yellow-500",
      bg: "bg-gray-100",
      border: "border-yellow-300",
    },
  ];

  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
            Popular Courses
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore high-demand programs with excellent career prospects.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-200 border-t-yellow-500"></div>
            </div>
          ) : (
            courses.map((course, index) => {
              const colorScheme = courseColors[index % courseColors.length];
              return (
                <div
                  key={course.id}
                  className={`${colorScheme.bg} p-6 rounded-2xl shadow-lg border-2 ${colorScheme.border} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${colorScheme.gradient} opacity-15 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`}
                  ></div>
                  <div
                    className={`flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r ${colorScheme.gradient} mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-lg`}
                  >
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">
                    {course.name}
                  </h3>
                  <div className="space-y-3 mb-6 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Universities:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {course.universities}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Salary:</span>
                      <span className="font-semibold text-gray-900">
                        {course.avgSalary}
                      </span>
                    </div>
                  </div>
                  <a
                    href="/listings"
                    className={`block w-full text-center py-3 px-4 bg-gradient-to-r ${colorScheme.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative z-10 shadow-md`}
                  >
                    Explore Programs
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
