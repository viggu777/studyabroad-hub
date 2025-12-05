// src/pages/Auth.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.role === "admin") {
          navigate("/dashboard");
        } else if (userData.role === "student") {
          navigate("/user-dashboard"); // Redirect students to their dashboard
        } else {
          navigate("/"); // Default redirect
        }
      } else {
        navigate("/"); // Fallback if no user document
      }
    } catch (err) {
      console.error("Firebase Login Error:", err.code);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Login to your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup-student"
            className="text-yellow-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
