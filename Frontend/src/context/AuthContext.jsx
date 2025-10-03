// /home/viggu/Documents/studyabroad-hub/Frontend/src/contexts/AuthContext.js

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config.js"; // Your firebase initialization
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function will be called when the user signs in
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      // The onAuthStateChanged listener will handle setting the user.
      // We just need to trigger the popup.
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
  }

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
