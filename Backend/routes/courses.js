const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/firebaseAuthMiddleware");
const Course = require("../models/Course");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("universities");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET a specific course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id }).populate(
      "universities"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new course
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Ensure you generate a unique string _id on the client-side before sending
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT (update) an existing course
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id }, // The filter
      req.body, // The update data
      { new: true } // Options: return the updated document
    ).populate("universities");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a course
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
