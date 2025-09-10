// src/components/home/FeaturedUniversities.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";

const services = [
  {
    title: "Application Tracker",
    description:
      "Keep track of all your applications, deadlines, and requirements in one organized dashboard.",
  },
  {
    title: "Expert Guidance",
    description:
      "Get personalized advice from education consultants and admission experts.",
  },
  {
    title: "Visa Support",
    description:
      "Complete visa guidance with document checklists and application assistance.",
  },
];

const FeaturedUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="bg-white py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-xl bg-yellow-100">
              <h3 className="text-xl font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 text-base text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Universities
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Top-ranked institutions trusted by students worldwide.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <p>Loading universities...</p>
          ) : (
            universities.map((uni) => (
              // Reverted to the original card structure
              <div
                key={uni.id}
                className="bg-yellow-100 p-6 rounded-lg shadow-lg border border-gray-100"
              >
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 py-1 px-3 rounded-full">
                  #{uni.ranking} world ranking
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {uni.name}
                </h3>
                <p className="mt-1 text-gray-500">{uni.country}</p>
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <p>
                    Tuition:{" "}
                    {uni.tuition ? `$${uni.tuition.toLocaleString()}` : "N/A"}
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
                  className="mt-6 block w-full text-center py-3 px-4 bg-yellow-1000 text-gray-900 rounded-lg font-bold hover:bg-yellow-600"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
