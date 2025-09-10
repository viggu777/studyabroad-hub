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

  return (
    <section className="bg-yellow-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore high-demand programs with excellent career prospects.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
                  <svg
                    className="h-6 w-6"
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
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {course.name}
                </h3>
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Universities:</strong> {course.universities}
                  </p>
                  <p>
                    <strong>Avg Salary:</strong> {course.avgSalary}
                  </p>
                </div>
                <a
                  href="/listings"
                  className="mt-6 block w-full text-center py-2 px-4 border border-yellow-500 rounded-md text-base font-semibold text-yellow-600 hover:bg-yellow-100"
                >
                  Explore Programs
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
