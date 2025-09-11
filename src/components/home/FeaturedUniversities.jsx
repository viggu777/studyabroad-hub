// src/components/home/FeaturedUniversities.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";

const FeaturedUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const services = [
    {
      title: "Application Tracker",
      description:
        "Keep track of all your applications, deadlines, and requirements in one organized dashboard.",
      icon: "📋",
      gradient: "from-yellow-500 to-yellow-500",
    },
    {
      title: "Expert Guidance",
      description:
        "Get personalized advice from education consultants and admission experts.",
      icon: "👨‍🎓",
      gradient: "from-amber-500 to-yellow-600",
    },
    {
      title: "Visa Support",
      description:
        "Complete visa guidance with document checklists and application assistance.",
      icon: "📄",
      gradient: "bg-gray-500",
    },
  ];

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universitiesCollection = collection(db, "universities");
        const q = query(universitiesCollection, limit(4));
        const uniSnapshot = await getDocs(q);
        const uniList = uniSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUniversities(uniList);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <>
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Section */}
          <div className="grid gap-8 md:grid-cols-3 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative overflow-hidden p-8 rounded-2xl bg-white border-2 border-yellow-200 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Universities Section */}
          <div className="text-center mb-12 ">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Featured Universities
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Top-ranked institutions trusted by students worldwide.
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-200 border-t-yellow-500"></div>
              </div>
            ) : (
              universities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block text-xs font-semibold bg-yellow-500 text-white py-2 px-3 rounded-full shadow-md">
                      #{uni.ranking} world ranking
                    </span>
                    <div className="h-8 w-8 bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {uni.name}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg
                      className="h-4 w-4 mr-2 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {uni.country}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tuition:</span>
                      <span className="font-semibold text-gray-900">
                        {uni.tuition
                          ? `$${uni.tuition.toLocaleString()}`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Scholarships:
                      </span>
                      <span className="font-semibold text-green-700">
                        {uni.scholarshipsAvailable} Available
                      </span>
                    </div>
                  </div>
                  <a
                    href={`/universities/${uni.id}`}
                    className="block w-full text-center py-3 px-4 bg-yellow-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View Details
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default FeaturedUniversities;
