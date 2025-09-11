import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Dashboard = () => {
  // State for the university form
  const [uniName, setUniName] = useState("");
  const [uniCountry, setUniCountry] = useState("");
  const [uniRanking, setUniRanking] = useState("");
  const [uniTuition, setUniTuition] = useState("");
  const [uniScholarships, setUniScholarships] = useState("");

  // State for the course form
  const [courseName, setCourseName] = useState("");
  const [courseUnis, setCourseUnis] = useState("");
  const [courseSalary, setCourseSalary] = useState("");

  // State to hold and display lists of existing data
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);

  const [message, setMessage] = useState(""); // For success/error feedback

  // Fetch existing universities and courses from Firestore
  const fetchData = async () => {
    const uniSnapshot = await getDocs(collection(db, "universities"));
    setUniversities(
      uniSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );

    const courseSnapshot = await getDocs(collection(db, "courses"));
    setCourses(
      courseSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle adding a new university
  const handleAddUniversity = async (e) => {
    e.preventDefault();
    if (!uniName || !uniCountry) {
      setMessage("University Name and Country are required.");
      return;
    }
    try {
      await addDoc(collection(db, "universities"), {
        name: uniName,
        country: uniCountry,
        ranking: uniRanking,
        tuition: Number(uniTuition),
        scholarshipsAvailable: Number(uniScholarships),
      });
      setMessage("University added successfully!");
      // Clear form
      setUniName("");
      setUniCountry("");
      setUniRanking("");
      setUniTuition("");
      setUniScholarships("");
      // Refresh data
      fetchData();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseName) {
      setMessage("Course Name is required.");
      return;
    }
    try {
      await addDoc(collection(db, "courses"), {
        name: courseName,
        universities: courseUnis,
        avgSalary: courseSalary,
      });
      setMessage("Course added successfully!");
      // Clear form
      setCourseName("");
      setCourseUnis("");
      setCourseSalary("");
      // Refresh data
      fetchData();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      {message && (
        <p className="mb-4 text-center p-2 bg-green-100 text-green-800 rounded">
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* University Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Manage Universities
          </h2>
          <form onSubmit={handleAddUniversity} className="space-y-4">
            <input
              type="text"
              value={uniName}
              onChange={(e) => setUniName(e.target.value)}
              placeholder="University Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={uniCountry}
              onChange={(e) => setUniCountry(e.target.value)}
              placeholder="Country"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={uniRanking}
              onChange={(e) => setUniRanking(e.target.value)}
              placeholder="World Ranking (e.g., #1)"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={uniTuition}
              onChange={(e) => setUniTuition(e.target.value)}
              placeholder="Tuition Fee ($)"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={uniScholarships}
              onChange={(e) => setUniScholarships(e.target.value)}
              placeholder="Scholarships Available (Number)"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gray-100 text-gray-900 font-bold rounded hover:bg-yellow-600"
            >
              Add University
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">
              Existing Universities: {universities.length}
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {universities.map((uni) => (
                <li key={uni.id}>
                  {uni.name}, {uni.country}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Manage Popular Courses
          </h2>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={courseUnis}
              onChange={(e) => setCourseUnis(e.target.value)}
              placeholder="Universities Count (e.g., 1250+)"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={courseSalary}
              onChange={(e) => setCourseSalary(e.target.value)}
              placeholder="Average Salary (e.g., $95,000)"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gray-100 text-gray-900 font-bold rounded hover:bg-yellow-600"
            >
              Add Course
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">
              Existing Courses: {courses.length}
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {courses.map((course) => (
                <li key={course.id}>{course.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
