import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  FiMapPin,
  FiAward,
  FiDollarSign,
  FiSearch,
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
} from "react-icons/fi";
import {
  TbWorld,
  TbSchool,
  TbCurrencyDollar,
  TbTestPipe,
} from "react-icons/tb";
import { LuSlidersHorizontal } from "react-icons/lu";

// --- A Skeleton component for a better loading experience ---
const UniversityCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="aspect-[16/10] bg-gray-200"></div>
    <div className="p-4">
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
      <div className="flex justify-between items-center border-t border-gray-200 pt-3">
        <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// --- Data for selection-based filters ---
const RANKING_RANGES = [
  { label: "Top 1-10", min: 1, max: 10 },
  { label: "11-50", min: 11, max: 50 },
  { label: "51-100", min: 51, max: 100 },
  { label: "101-200", min: 101, max: 200 },
  { label: "201+", min: 201, max: Infinity },
];

const POPULAR_COURSES = [
  "Computer Science",
  "Engineering",
  "Business",
  "Medicine",
  "Data Science",
  "Law",
];

const REQUIRED_EXAMS = ["IELTS", "TOEFL", "SAT", "ACT", "GRE"];

const INITIAL_FILTERS = {
  country: "",
  courses: [],
  ranking: [],
  exams: [],
  tuitionMax: 100000,
  scholarships: false,
};

const UniversitiesPage = () => {
  const [allUniversities, setAllUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [openSections, setOpenSections] = useState({
    location: true,
    fees: true,
    course: true,
    ranking: true,
    exams: true,
    other: true,
  });

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "universities"),
      (snapshot) => {
        if (snapshot.empty) {
          console.error("No universities found.");
          setLoading(false);
        } else {
          const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllUniversities(results);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching universities:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  useEffect(() => {
    let result = allUniversities.filter((uni) => {
      const rankingStr = uni.ranking || "0";
      let rankingValue = 0;

      if (rankingStr.includes("-")) {
        rankingValue =
          parseInt(rankingStr.replace(/[^0-9-]/g, "").split("-")[0]) || 0;
      } else {
        rankingValue = parseInt(rankingStr.replace(/[^0-9]/g, "")) || Infinity;
      }

      const rankingFilter =
        filters.ranking.length === 0 ||
        filters.ranking.some(
          (range) => rankingValue >= range.min && rankingValue <= range.max
        );

      const courseFilter =
        filters.courses.length === 0 ||
        filters.courses.some((course) =>
          (uni.courses || "").toLowerCase().includes(course.label.toLowerCase())
        );

      const examFilter =
        filters.exams.length === 0 ||
        filters.exams.some((exam) =>
          (uni.requiredExams || "")
            .toLowerCase()
            .includes(exam.label.toLowerCase())
        );

      return (
        (searchTerm
          ? uni.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true) &&
        (filters.country ? uni.country === filters.country : true) &&
        rankingFilter &&
        courseFilter &&
        examFilter &&
        (uni.tuition || 0) <= filters.tuitionMax &&
        (filters.scholarships ? (uni.scholarshipsAvailable || 0) > 0 : true)
      );
    });
    setFilteredUniversities(result);
  }, [searchTerm, filters, allUniversities]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name !== "scholarships") {
      const parsedValue = JSON.parse(value);
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], parsedValue]
          : prev[name].filter(
              (item) => JSON.stringify(item) !== JSON.stringify(parsedValue)
            ),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : name === "tuitionMax"
            ? Number(value)
            : value,
      }));
    }
  };

  const handleCountryChange = (country) => {
    setFilters((prev) => ({
      ...prev,
      country: prev.country === country ? "" : country,
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm("");
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Count active filters
  const activeFiltersCount =
    (filters.country ? 1 : 0) +
    filters.courses.length +
    filters.ranking.length +
    filters.exams.length +
    (filters.tuitionMax < 100000 ? 1 : 0) +
    (filters.scholarships ? 1 : 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Explore Your Dream University & Courses
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Search and filter from our extensive list of global institutions.
          </p>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 py-8">
        {/* Enhanced Filter Sidebar */}
        <aside className="w-1/4 lg:w-1/5 bg-white rounded-xl shadow-lg h-fit sticky top-24 border border-gray-200">
          {/* Filter Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FiFilter className="mr-2 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-gray-500 hover:text-yellow-500 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Search Input */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search universities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("location")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <TbWorld className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Location
                </span>
                {openSections.location ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.location && (
                <div className="mt-3 space-y-2 pl-2">
                  {["USA", "UK", "Canada", "Australia", "Germany"].map(
                    (country) => (
                      <button
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filters.country === country
                            ? "bg-yellow-500 text-white shadow-sm"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {country}
                        {filters.country === country && (
                          <span className="float-right">✓</span>
                        )}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Course Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("course")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <FiBookOpen className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Courses
                  {filters.courses.length > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {filters.courses.length}
                    </span>
                  )}
                </span>
                {openSections.course ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.course && (
                <div className="mt-3 space-y-2 pl-2">
                  {POPULAR_COURSES.map((course) => (
                    <label
                      key={course}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        filters.courses.some((c) => c.label === course)
                          ? "bg-yellow-50 border border-yellow-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="courses"
                        value={JSON.stringify({ label: course, value: course })}
                        checked={filters.courses.some(
                          (c) => c.label === course
                        )}
                        onChange={handleFilterChange}
                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {course}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Ranking Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("ranking")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <FiAward className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Ranking
                  {filters.ranking.length > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {filters.ranking.length}
                    </span>
                  )}
                </span>
                {openSections.ranking ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.ranking && (
                <div className="mt-3 space-y-2 pl-2">
                  {RANKING_RANGES.map((range) => (
                    <label
                      key={range.label}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        filters.ranking.some((r) => r.label === range.label)
                          ? "bg-yellow-50 border border-yellow-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="ranking"
                        value={JSON.stringify({ ...range, value: range.label })}
                        checked={filters.ranking.some(
                          (r) => r.label === range.label
                        )}
                        onChange={handleFilterChange}
                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Exams Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("exams")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <TbTestPipe className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Exams
                  {filters.exams.length > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {filters.exams.length}
                    </span>
                  )}
                </span>
                {openSections.exams ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.exams && (
                <div className="mt-3 space-y-2 pl-2">
                  {REQUIRED_EXAMS.map((exam) => (
                    <label
                      key={exam}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        filters.exams.some((e) => e.label === exam)
                          ? "bg-yellow-50 border border-yellow-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="exams"
                        value={JSON.stringify({ label: exam, value: exam })}
                        checked={filters.exams.some((e) => e.label === exam)}
                        onChange={handleFilterChange}
                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {exam}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Fees Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("fees")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <TbCurrencyDollar className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Max Tuition
                  {filters.tuitionMax < 100000 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      1
                    </span>
                  )}
                </span>
                {openSections.fees ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.fees && (
                <div className="mt-4 px-2">
                  <div className="text-center mb-4">
                    <span className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-full text-lg">
                      ${parseInt(filters.tuitionMax).toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    name="tuitionMax"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.tuitionMax}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #eab308 0%, #eab308 ${
                        (filters.tuitionMax / 100000) * 100
                      }%, #e5e7eb ${
                        (filters.tuitionMax / 100000) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$0</span>
                    <span>$100K+</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Filters */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection("other")}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <span className="flex items-center font-medium text-gray-900">
                  <TbSchool className="mr-3 text-gray-600 group-hover:text-yellow-500 transition-colors duration-200" />
                  Other Options
                  {filters.scholarships && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      1
                    </span>
                  )}
                </span>
                {openSections.other ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              {openSections.other && (
                <div className="mt-3 pl-2">
                  <label
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      filters.scholarships
                        ? "bg-yellow-50 border border-yellow-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="scholarships"
                      checked={filters.scholarships}
                      onChange={handleFilterChange}
                      className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Scholarships Available
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-700">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredUniversities.length}
              </span>{" "}
              universities
            </p>
            {activeFiltersCount > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">Active filters:</span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-medium">
                  {activeFiltersCount}
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <UniversityCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={
                          uni.imageUrl ||
                          "https://via.placeholder.com/400x250/e2e8f0/94a3b8?text=University"
                        }
                        alt={uni.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                      {uni.name}
                    </h3>
                    <p className="text-gray-600 mb-3 flex items-center text-sm">
                      <FiMapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      {uni.location}, {uni.country}
                    </p>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">
                      {(uni.description || "").substring(0, 70)}...
                    </p>
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">
                        Popular Courses
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(uni.courses || "")
                          .split(",")
                          .slice(0, 2)
                          .map((course, i) => (
                            <span
                              key={i}
                              className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full"
                            >
                              {course.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-auto">
                      <Link
                        to="/counseling"
                        className="px-4 py-2 text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                      >
                        Get Counselling
                      </Link>
                      <Link
                        to={`/universities/${uni.id}`}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                      >
                        Explore &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UniversitiesPage;
