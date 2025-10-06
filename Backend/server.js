// server/server.js
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

// Import routes
const authRoutes = require("./routes/auth.js");
const courseRoutes = require("./routes/courses");
const universityRoutes = require("./routes/universities");

const app = express();
const port = process.env.PORT || 5001; // Use a different port from your React app

// --- Middleware ---
// Initialize Firebase Admin

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable parsing of JSON bodies
app.use(express.json());

// --- MongoDB Connection ---
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

// --- API Endpoints ---

// Auth routes
app.use("/api/auth", authRoutes);

// Use resource routes
app.use("/api/courses", courseRoutes);
app.use("/api/universities", universityRoutes);

// --- Start Server ---
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
