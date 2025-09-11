import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { FiBookOpen } from "react-icons/fi";

export default function Listings() {
  // State for the active tab
  const [activeTab, setActiveTab] = React.useState("universities");

  // State for all data
  const [allUniversities, setAllUniversities] = React.useState([]);
  const [allCourses, setAllCourses] = React.useState([]);
  const [filteredUniversities, setFilteredUniversities] = React.useState([]);
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // State for filters and search
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    country: "",
    tuitionMax: 100000,
    scholarships: false,
  });

  // State for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 9;

  // 1. Fetch all data from Firestore on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Universities
        const uniSnapshot = await getDocs(collection(db, "universities"));
        const uniList = uniSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUniversities(uniList);
        setFilteredUniversities(uniList);

        // Fetch Courses
        const courseSnapshot = await getDocs(collection(db, "courses"));
        const courseList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllCourses(courseList);
        setFilteredCourses(courseList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Apply filters whenever filters or searchTerm change
  React.useEffect(() => {
    // Filter Universities
    let uniResult = allUniversities.filter((uni) => {
      const matchesSearch = searchTerm
        ? uni.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCountry = filters.country
        ? uni.country === filters.country
        : true;
      const matchesTuition = uni.tuition <= filters.tuitionMax;
      const matchesScholarships = filters.scholarships
        ? uni.scholarshipsAvailable > 0
        : true;
      return (
        matchesSearch && matchesCountry && matchesTuition && matchesScholarships
      );
    });
    setFilteredUniversities(uniResult);

    // Filter Courses
    let courseResult = allCourses.filter((course) =>
      searchTerm
        ? course.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
    setFilteredCourses(courseResult);

    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, filters, allUniversities, allCourses]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Pagination Logic
  const listToPaginate =
    activeTab === "universities" ? filteredUniversities : filteredCourses;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listToPaginate.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(listToPaginate.length / itemsPerPage);

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => {
        setActiveTab(tabName);
        setSearchTerm("");
        setCurrentPage(1);
      }}
      className={`px-6 py-3 text-base font-bold transition-colors duration-300 ${
        activeTab === tabName
          ? "border-b-2 border-yellow-500 text-yellow-600"
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- Filter Sidebar --- */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
              Filters
            </h2>
            {activeTab === "universities" ? (
              <div className="space-y-6">
                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="tuitionMax"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Max Tuition:{" "}
                    <span className="font-bold text-yellow-600">
                      ${filters.tuitionMax.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    name="tuitionMax"
                    id="tuitionMax"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.tuitionMax}
                    onChange={handleFilterChange}
                    className="w-full mt-2 accent-yellow-500"
                  />
                </div>
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    name="scholarships"
                    id="scholarships"
                    checked={filters.scholarships}
                    onChange={handleFilterChange}
                    className="h-5 w-5 rounded accent-yellow-500"
                  />
                  <label
                    htmlFor="scholarships"
                    className="ml-3 font-semibold text-gray-700"
                  >
                    Scholarships Available
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Filters for courses are coming soon. Use the search bar to
                  find a specific course.
                </p>
              </div>
            )}
          </aside>

          {/* --- Results Grid --- */}
          <main className="lg:col-span-3">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-2">
                <TabButton tabName="universities" label="Universities" />
                <TabButton tabName="courses" label="Courses" />
              </div>
            </div>

            {/* Search and Sort Bar */}
            <div className="bg-white p-4 rounded-b-lg shadow-md mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search by ${
                  activeTab === "universities" ? "university" : "course"
                } name...`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-sm text-gray-600 mt-2">
                Showing {listToPaginate.length} results
              </p>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p>Loading listings...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeTab === "universities"
                    ? currentItems.map((uni) => (
                        <div
                          key={uni.id}
                          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                          <span className="text-xs font-semibold bg-gray-100 text-gray-700 py-1 px-3 rounded-full self-start">
                            Rank: {uni.ranking}
                          </span>
                          <h3 className="mt-4 text-xl font-bold text-gray-900 flex-grow">
                            {uni.name}
                          </h3>
                          <p className="mt-1 text-gray-500">{uni.country}</p>
                          <div className="mt-4 text-sm text-gray-600 space-y-2">
                            <p>
                              Tuition:{" "}
                              {uni.tuition
                                ? `$${uni.tuition.toLocaleString()}`
                                : "N/A"}
                            </p>
                            <p>
                              Scholarships:{" "}
                              <span className="text-green-600 font-semibold">
                                {uni.scholarshipsAvailable} Available
                              </span>
                            </p>
                          </div>
                          <Link
                            to={`/universities/${uni.id}`}
                            className="mt-6 block w-full text-center py-3 px-4 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      ))
                    : currentItems.map((course) => (
                        <div
                          key={course.id}
                          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-100 text-yellow-600">
                            <FiBookOpen size={24} />
                          </div>
                          <h3 className="mt-5 text-xl font-bold text-gray-900 flex-grow">
                            {course.name}
                          </h3>
                          <div className="mt-4 text-sm text-gray-600 space-y-2">
                            <p>
                              <strong>Universities Offering:</strong>{" "}
                              {course.universities}
                            </p>
                            <p>
                              <strong>Average Salary:</strong>{" "}
                              {course.avgSalary}
                            </p>
                          </div>
                          <Link
                            to={`/courses/${course.id}`}
                            className="mt-6 block w-full text-center py-2 px-4 border border-yellow-500 rounded-lg text-base font-semibold text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors"
                          >
                            Explore Programs
                          </Link>
                        </div>
                      ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
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
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
