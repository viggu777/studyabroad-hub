import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiMapPin,
  FiArrowLeft,
  FiGlobe,
  FiDollarSign,
  FiAward,
  FiBookOpen,
  FiUsers,
  FiStar,
} from "react-icons/fi"; // apiClient was imported from react-icons/fi, which is incorrect. Assuming it's imported from your api.js file.
import apiClient from "../api";

const UniversityDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run the effect if the id is present
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchUniversity = async () => {
      try {
        const response = await apiClient.get(`/universities/${id}`);
        setUniversity(response.data);
      } catch (error) {
        console.error("Error fetching university:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            University Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The university you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const courseList = university.courses
    ? university.courses.split(",").map((course) => course.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Universities</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* University Image with Overlay */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={
                university.imageUrl ||
                "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
              }
              alt={university.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* University Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {university.name}
              </h1>
              <div className="flex items-center text-white/90 text-lg">
                <FiMapPin className="mr-2" />
                <span>
                  {university.location}, {university.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FiBookOpen className="mr-3 text-blue-600" />
                About {university.name}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {university.description ||
                  "Detailed information about this university will be available soon."}
              </p>
            </div>

            {/* Popular Courses */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FiUsers className="mr-3 text-green-600" />
                Popular Courses
              </h2>
              {courseList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseList.map((course, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-800 font-medium">
                          {course}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  Course information not available
                </p>
              )}
            </div>

            {/* Required Exams */}
            {university.requiredExams && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiAward className="mr-3 text-purple-600" />
                  Required Exams
                </h2>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <p className="text-gray-800 text-lg font-medium">
                    {university.requiredExams}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Quick Information
              </h3>

              <div className="space-y-4">
                {/* Tuition */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <FiDollarSign className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Annual Tuition
                    </p>
                    <p className="text-green-600 font-bold text-lg">
                      $
                      {university.tuition?.toLocaleString() ||
                        "Contact for details"}
                    </p>
                  </div>
                </div>

                {/* Scholarships */}
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <FiAward className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Scholarships</p>
                    <p
                      className={`font-bold ${
                        university.scholarshipsAvailable
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {university.scholarshipsAvailable
                        ? "Available"
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                {/* Ranking */}
                {university.ranking && (
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                      <FiStar className="text-yellow-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        World Ranking
                      </p>
                      <p className="text-yellow-600 font-bold text-lg">
                        #{university.ranking}
                      </p>
                    </div>
                  </div>
                )}

                {/* Website */}
                {university.website && (
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                      <FiGlobe className="text-indigo-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Official Website
                      </p>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Ready to Apply?</h3>
              <p className="text-blue-100 mb-6">
                Get personalized counseling to guide you through the application
                process.
              </p>
              <Link
                to="/counseling"
                className="block w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Get Free Counseling
              </Link>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Need More Info?
              </h3>
              <p className="text-gray-600 mb-4">
                Our education consultants are here to help you make the right
                choice.
              </p>
              <div className="space-y-2">
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  📞 Schedule a Call
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  💬 Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
