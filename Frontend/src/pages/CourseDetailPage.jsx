import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../api";
import {
  FiArrowLeft,
  FiBookOpen,
  FiDollarSign,
  FiBarChart2,
  FiBriefcase,
  FiUsers,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
} from "react-icons/fi";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await apiClient.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If backend populates university, this will be an object
  const uni =
    course.university && typeof course.university === "object"
      ? course.university
      : null;

  // Hero image: course image → university image → default
  const heroImage =
    course.imageUrl ||
    uni?.imageUrl ||
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400";

  const formattedDeadline = course.applicationDeadline
    ? new Date(course.applicationDeadline).toLocaleDateString()
    : null;

  const intakeText = Array.isArray(course.intakeTerms)
    ? course.intakeTerms.join(", ")
    : course.intakeTerms || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors duration-200 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Courses</span>
          </button>
          {uni && (
            <Link
              to={`/universities/${uni._id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              View {uni.name}
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-80 overflow-hidden">
            <img
              src={heroImage}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-yellow-400 font-semibold text-lg mb-1">
                {course.field || "General"}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {course.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-100">
                {course.level && (
                  <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20">
                    🎓 {course.level}
                  </span>
                )}
                {uni && (
                  <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 flex items-center">
                    <FiMapPin className="mr-1" />
                    {uni.name}, {uni.country}
                  </span>
                )}
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
                <FiBookOpen className="mr-3 text-yellow-600" />
                About this Course
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {course.description ||
                  `Detailed information about the ${
                    course.name
                  } program will be available soon. This course is in the field of ${
                    course.field || "this area"
                  } and is offered as a ${course.level || "degree"}.`}
              </p>

              {course.courseUrl && (
                <a
                  href={course.courseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center mt-6 px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
                >
                  <FiExternalLink className="mr-2" />
                  Visit Official Course Page
                </a>
              )}
            </div>

            {/* Career Prospects */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FiBriefcase className="mr-3 text-green-600" />
                Career Prospects
              </h2>
              <div className="bg-green-50 p-6 rounded-lg border border-green-100 space-y-3">
                <p className="text-gray-800 text-lg">
                  Graduates from this field can expect an average starting
                  salary of{" "}
                  <span className="font-bold text-green-700">
                    {course.avgSalary || "N/A"}
                  </span>
                  .
                </p>
                <p className="text-gray-700">
                  Common roles may include positions in{" "}
                  {course.field || "this domain"}, depending on your
                  specialization, university, and country of study.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Quick Information
              </h3>
              <div className="space-y-4">
                {/* Degree Level */}
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                    <FiBarChart2 className="text-yellow-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Degree Level</p>
                    <p className="text-gray-600 font-medium text-lg">
                      {course.level || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* University */}
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <FiUsers className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">University</p>
                    {uni ? (
                      <Link
                        to={`/universities/${uni._id}`}
                        className="text-blue-600 font-medium text-lg hover:underline"
                      >
                        {uni.name}
                        {uni.country ? ` (${uni.country})` : ""}
                      </Link>
                    ) : (
                      <p className="text-gray-500 italic">
                        University information not available.
                      </p>
                    )}
                  </div>
                </div>

                {/* Tuition */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <FiDollarSign className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Tuition Fee (Approx.)
                    </p>
                    <p className="text-green-700 font-bold text-lg">
                      {course.tuition
                        ? `${course.currency || ""} ${course.tuition}`
                        : "Contact for fee details"}
                    </p>
                  </div>
                </div>

                {/* Duration & Mode */}
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <FiClock className="text-purple-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Duration & Mode
                    </p>
                    <p className="text-gray-700">
                      {course.durationMonths
                        ? `${course.durationMonths} months`
                        : "Duration not specified"}
                      {course.mode ? ` • ${course.mode}` : ""}
                    </p>
                  </div>
                </div>

                {/* Intakes */}
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-lg mr-4">
                    <FiCalendar className="text-orange-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Intake Terms</p>
                    <p className="text-gray-700">
                      {intakeText || "Intake information not available"}
                    </p>
                    {formattedDeadline && (
                      <p className="text-sm text-gray-500 mt-1">
                        Application deadline:{" "}
                        <span className="font-medium">{formattedDeadline}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Scholarships */}
                <div className="flex items-start">
                  <div className="bg-teal-100 p-2 rounded-lg mr-4">
                    <FiDollarSign className="text-teal-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Scholarships</p>
                    <p className="text-gray-700">
                      {course.scholarshipsAvailable
                        ? "Scholarships are available for this program."
                        : "Scholarship details not specified."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Find Your University</h3>
              <p className="text-yellow-100 mb-6">
                Explore universities that offer programs like this and get
                expert counseling for your study abroad journey.
              </p>
              <Link
                to="/universities"
                className="block w-full bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Explore Universities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
