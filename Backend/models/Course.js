const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    field: { type: String },
    level: { type: String },
    // CORRECTED: This field now correctly references the University model
    universities: [
      {
        type: String,
        ref: "University",
      },
    ],
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
