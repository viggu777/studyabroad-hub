import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  FiBookOpen,
  FiSearch,
  FiBarChart2,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

const CourseCardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="h-40 w-full bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-4 w-1/3 bg-gray-200 rounded-full mb-3"></div>
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
    <div className="h-4 w-full bg-gray-200 rounded"></div>
  </div>
);

const CoursesPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fieldOfStudy: "",
    degreeLevel: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseSnapshot = await getDocs(collection(db, "courses"));
        const courseList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllCourses(courseList);
        setFilteredCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = allCourses.filter(
      (course) =>
        (searchTerm
          ? course.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true) &&
        (filters.fieldOfStudy ? course.field === filters.fieldOfStudy : true) &&
        (filters.degreeLevel ? course.level === filters.degreeLevel : true)
    );
    setFilteredCourses(result);
    setCurrentPage(1);
  }, [searchTerm, filters, allCourses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const currentItems = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Dark Header Section */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Explore Top Courses
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Find the perfect program to launch your international career.
          </p>
        </div>
      </header>

      {/* Filter Bar Section */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4 py-4">
            <div className="relative flex-grow w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Course name..."
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg text-lg"
              />
            </div>
            <select
              name="fieldOfStudy"
              value={filters.fieldOfStudy}
              onChange={handleFilterChange}
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg text-lg"
            >
              <option value="">All Fields</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts & Humanities">Arts & Humanities</option>
              <option value="Medicine">Medicine</option>
            </select>
            <select
              name="degreeLevel"
              value={filters.degreeLevel}
              onChange={handleFilterChange}
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg text-lg"
            >
              <option value="">All Levels</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredCourses.length} results
        </p>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((course) => (
                <Link
                  to={`/courses/${course.id}`}
                  key={course.id}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={
                          course.imageUrl ||
                          "https://via.placeholder.com/400x250/e2e8f0/94a3b8?text=Course"
                        }
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-semibold text-yellow-600">
                        {course.field || "General"}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3 truncate group-hover:text-yellow-600 transition-colors">
                        {course.name}
                      </h3>
                      <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
                        <p className="flex items-center text-gray-600">
                          <FiUsers className="mr-2 text-gray-400" />{" "}
                          <strong>Universities:</strong>
                          <span className="ml-1">{course.universities}</span>
                        </p>
                        <p className="flex items-center text-gray-600">
                          <FiDollarSign className="mr-2 text-gray-400" />{" "}
                          <strong>Avg Salary:</strong>
                          <span className="ml-1">{course.avgSalary}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex rounded-lg shadow-sm">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 border border-gray-300 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                        currentPage === index + 1
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
export default CoursesPage;
