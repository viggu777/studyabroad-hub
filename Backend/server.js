// server/server.js
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/auth.js");
const courseRoutes = require("./routes/courses");
const universityRoutes = require("./routes/universities");

const app = express();
const port = process.env.PORT || 5001;

// --- Firebase Admin Init (works for both local & deploy) ---
let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // 🔹 Deployment mode: JSON string in env
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("Using FIREBASE_SERVICE_ACCOUNT from env");
  } else {
    // 🔹 Local mode: use JSON file
    serviceAccount = require("./serviceAccountKey.json");
    console.log("Using local serviceAccountKey.json file");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (err) {
  console.error("Failed to initialize Firebase Admin:", err);
  process.exit(1);
}

// --- Middleware ---
<<<<<<< HEAD
// Initialize Firebase Admin

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Enable Cross-Origin Resource Sharing
=======
>>>>>>> 257089e (Update frontend and backend with latest changes)
app.use(cors());
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
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/universities", universityRoutes);

// --- Start Server ---
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
