import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config"; // Make sure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FiCheck, FiBriefcase, FiUser } from "react-icons/fi"; // Using react-icons for the icons

const StudentSignup = () => {
  // State for all form fields
  const [fullName, setFullName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation for pincode
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setError("Pincode must be a 6-digit number.");
      return;
    }

    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Create a user document in Firestore with all the details
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        mobileNo,
        email,
        address,
        pincode,
        role: "student", // Assigning the role of 'student'
        createdAt: serverTimestamp(), // Adds a server timestamp
      });

      // 3. Navigate to the home page or a student dashboard after signup
      navigate("/"); // Or navigate('/student-dashboard')
    } catch (err) {
      console.error("Firebase Signup Error:", err);

      // Provide user-friendly error messages
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email address already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. It should be at least 6 characters.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="flex w-full max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left Informational Panel */}
        <div
          className="hidden md:flex flex-col justify-center w-1/2 p-12 bg-gray-900 text-white bg-opacity-75"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
          }}
        >
          <div className="flex items-center mb-4">
            <FiBriefcase className="text-4xl text-yellow-400 mr-3" />
            <h1 className="text-3xl font-bold">Create your student account</h1>
          </div>
          <p className="mb-6 text-gray-300">
            Sign up to manage applications, upload documents, and access
            personalized counselling resources.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <FiCheck className="text-green-400 mr-2" /> Secure authentication
              and file uploads
            </li>
            <li className="flex items-center">
              <FiCheck className="text-green-400 mr-2" /> Track academic details
              and preferences
            </li>
            <li className="flex items-center">
              <FiCheck className="text-green-400 mr-2" /> Support from our
              counselling team
            </li>
          </ul>
          <div className="border-t border-gray-600 pt-6">
            <p className="font-semibold text-lg mb-2">Or</p>
            <a href="#" className="block text-yellow-400 hover:underline mb-1">
              SignUp as university
            </a>
            <a href="#" className="block text-yellow-400 hover:underline">
              SignUp as student
            </a>
          </div>
        </div>

        {/* Right Signup Form Panel */}
        <div className="w-full md:w-1/2 p-8 bg-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Student Signup
          </h2>
          <p className="text-gray-600 mb-6">
            Enter details to get started. Fields marked with{" "}
            <span className="text-red-500">*</span> are required.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Your mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="6-digit pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength="6"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
