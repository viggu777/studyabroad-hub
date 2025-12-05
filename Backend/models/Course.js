const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    field: { type: String }, // e.g. "Computer Science"
    level: { type: String }, // e.g. "Bachelors", "Masters"

    // 🔹 Each course belongs to exactly ONE university
    university: {
      type: String, // because University _id is String
      ref: "University",
      required: true,
    },

    // 🔹 Course-specific info for that university
    tuition: { type: Number }, // e.g. 15000
    currency: { type: String }, // "USD", "EUR", "INR"
    durationMonths: { type: Number }, // e.g. 24
    mode: { type: String }, // "Full-time", "Part-time", "Online"
    intakeTerms: [{ type: String }], // ["Fall 2026", "Spring 2027"]
    applicationDeadline: { type: Date },
    scholarshipsAvailable: { type: Boolean },
    courseUrl: { type: String }, // course page on university website

    avgSalary: { type: String },
    imageUrl: { type: String },
    // Add other fields as necessary
  },
  {
    // This option tells Mongoose not to create its own default _id.
    _id: false,
  }
);

module.exports = mongoose.model("Course", courseSchema);
