import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import apiClient from "../../api";

const UniversityCardSkeleton = () => (
  <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="aspect-[4/5] bg-slate-700"></div>
  </div>
);

const FeaturedUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await apiClient.get("/universities");
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900  sm:text-5xl mb-4">
            Featured Universities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore top-ranked institutions trusted by students and employers
            worldwide.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>
        {/* limiting to only show top 4 universities */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <>
              <UniversityCardSkeleton />
              <UniversityCardSkeleton />
              <UniversityCardSkeleton />
              <UniversityCardSkeleton />
            </>
          ) : (
            universities
              .filter((uni) => uni._id) // Ensure university has a valid ID before rendering
              .slice(0, 4)
              .map((uni) => (
                <Link
                  to={`/universities/${uni._id}`}
                  key={uni._id}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
                    <div className="aspect-[4/5] w-full">
                      <img
                        src={
                          uni.imageUrl ||
                          "https://via.placeholder.com/400x500/1e293b/FFFFFF?text=Campus"
                        }
                        alt={uni.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {uni.ranking && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-yellow-400 text-xs font-bold py-1 px-3 rounded-full">
                        World Rank #{uni.ranking}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {uni.name}
                        </h3>
                        <p className="text-sm text-gray-300 flex items-center mt-1">
                          <FiMapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                          {uni.country}
                        </p>
                      </div>
                      {uni.tuition && (
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-xs text-gray-400">Tuition/yr</p>
                          <p className="text-lg font-bold text-yellow-400">
                            ${uni.tuition.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 bg-slate-900/50 backdrop-blur-sm text-white p-2 rounded-full transform translate-x-16 group-hover:translate-x-0 transition-transform duration-300">
                      <FiArrowRight />
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/universities"
            className="px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30"
          >
            Explore All Universities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
