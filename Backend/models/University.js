const mongoose = require("mongoose");

// This is your current schema (or similar)
// const universitySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   ...
// });

// --- REPLACE IT WITH THIS ---
const universitySchema = new mongoose.Schema(
  {
    // 1. Explicitly define _id as a String. This is the main fix.
    _id: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    location: { type: String },
    country: { type: String },
    website: { type: String },
    description: { type: String },
    courses: { type: String },
    imageUrl: { type: String },
    ranking: { type: String },
    tuition: { type: Number },
    scholarshipsAvailable: { type: Boolean },
    requiredExams: { type: String },
    // Add other fields as necessary
  },
  {
    // 2. This option tells Mongoose not to create its own default _id.
    _id: false,
  }
);

module.exports = mongoose.model("University", universitySchema);
