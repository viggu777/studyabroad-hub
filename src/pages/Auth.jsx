import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        // --- SIGNUP LOGIC ---
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "user",
        });

        navigate("/");
      }
    } catch (err) {
      // **IMPROVED ERROR HANDLING**
      // Log the detailed error to the console for debugging
      console.error("Firebase Auth Error Code:", err.code);
      console.error("Firebase Auth Error Message:", err.message);

      // Provide a more user-friendly error message
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email address already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. It should be at least 6 characters.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Create an Account"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-6">
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
            className="w-full py-2 px-4 bg-yellow-1000 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
