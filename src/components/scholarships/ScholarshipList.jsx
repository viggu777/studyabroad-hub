import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { FiAward, FiDollarSign, FiGlobe, FiSearch } from "react-icons/fi";

const ScholarshipCardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="h-8 w-1/3 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        // Assuming you have a 'scholarships' collection in Firestore
        const scholarshipsCollection = collection(db, "scholarships");
        const q = query(scholarshipsCollection, limit(10));
        const scholarshipSnapshot = await getDocs(q);
        const scholarshipList = scholarshipSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScholarships(scholarshipList);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scholarship name..."
              className="w-full pl-12 p-3 border border-gray-300 rounded-lg text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(6)].map((_, i) => <ScholarshipCardSkeleton key={i} />)
          ) : filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-yellow-100 rounded-full mr-3">
                      <FiAward className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {scholarship.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 h-20">
                    {scholarship.description}
                  </p>
                  <div className="space-y-3 border-t pt-4">
                    <p className="flex items-center text-gray-700">
                      <FiDollarSign className="mr-2 text-gray-500" />
                      <strong>Amount:</strong>
                      <span className="ml-2 font-semibold text-green-600">
                        {scholarship.amount}
                      </span>
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FiGlobe className="mr-2 text-gray-500" />
                      <strong>Eligibility:</strong>
                      <span className="ml-2">{scholarship.eligibility}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3">
                  <a
                    href={scholarship.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 font-semibold hover:text-yellow-800"
                  >
                    Learn More &rarr;
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No scholarships found matching your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipList;
