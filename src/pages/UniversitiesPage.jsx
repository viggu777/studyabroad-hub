import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  FiMapPin,
  FiAward,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

// --- NEW: A Modal for Advanced Filters ---
const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">More Filters</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="tuitionMax"
                  className="font-semibold text-gray-700 block mb-2"
                >
                  Max Tuition:{" "}
                  <span className="font-bold text-yellow-600">
                    ${parseInt(localFilters.tuitionMax).toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  name="tuitionMax"
                  id="tuitionMax"
                  min="0"
                  max="100000"
                  step="1000"
                  value={localFilters.tuitionMax}
                  onChange={handleFilterChange}
                  className="w-full mt-2 accent-yellow-500"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-2">
                  World Ranking
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="rankingMin"
                    value={localFilters.rankingMin}
                    onChange={handleFilterChange}
                    className="w-1/2 p-2 border rounded-lg"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="rankingMax"
                    value={localFilters.rankingMax}
                    onChange={handleFilterChange}
                    className="w-1/2 p-2 border rounded-lg"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  name="scholarships"
                  id="scholarships"
                  checked={localFilters.scholarships}
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
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() =>
                    setFilters({
                      country: filters.country,
                      tuitionMax: 100000,
                      scholarships: false,
                      rankingMin: 1,
                      rankingMax: 1000,
                    })
                  }
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const UniversitiesPage = () => {
  const [allUniversities, setAllUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    tuitionMax: 100000,
    scholarships: false,
    rankingMin: 1,
    rankingMax: 1000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniSnapshot = await getDocs(collection(db, "universities"));
        const uniList = uniSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUniversities(uniList);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = allUniversities.filter((uni) => {
      const ranking = parseInt(uni.ranking?.replace(/[^0-9]/g, "")) || 0;
      return (
        (searchTerm
          ? uni.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true) &&
        (filters.country ? uni.country === filters.country : true) &&
        uni.tuition <= filters.tuitionMax &&
        (filters.scholarships ? uni.scholarshipsAvailable > 0 : true) &&
        ranking >= filters.rankingMin &&
        ranking <= filters.rankingMax
      );
    });
    setFilteredUniversities(result);
    setCurrentPage(1);
  }, [searchTerm, filters, allUniversities]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const currentItems = filteredUniversities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {/* --- NEW: Dark Header Section --- */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Find Your University
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Search and filter from our extensive list of global institutions.
          </p>
        </div>
      </header>

      {/* --- NEW: Filter Bar Section --- */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4 py-4">
            <div className="relative flex-grow w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by University name..."
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg text-lg"
              />
            </div>
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg text-lg"
            >
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center p-3 border border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-50"
            >
              <FiFilter className="mr-2" /> More Filters
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredUniversities.length} results
        </p>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <UniversityCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((uni) => (
                <Link
                  to={`/universities/${uni.id}`}
                  key={uni.id}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="relative">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={
                            uni.imageUrl ||
                            "https://via.placeholder.com/400x250/e2e8f0/94a3b8?text=University"
                          }
                          alt={uni.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-yellow-600 transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-gray-600 mb-4 flex items-center text-sm">
                        <FiMapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                        {uni.country}
                      </p>
                      <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-sm">
                        <div>
                          <p className="text-gray-500">Rank</p>
                          <p className="font-semibold text-gray-800 flex items-center">
                            <FiAward className="mr-1 text-yellow-500" />
                            {uni.ranking || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tuition/yr</p>
                          <p className="font-semibold text-gray-800 flex items-center">
                            <FiDollarSign className="mr-1 text-yellow-500" />
                            {uni.tuition ? uni.tuition.toLocaleString() : "N/A"}
                          </p>
                        </div>
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
export default UniversitiesPage;
