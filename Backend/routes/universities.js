const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/firebaseAuthMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const University = require("../models/University");

// GET all universities
router.get("/", async (req, res) => {
  try {
    // Add .lean() here to get plain objects with the _id field included
    const universities = await University.find().lean();
    res.json(universities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET a specific university by ID
router.get("/:id", async (req, res) => {
  try {
    // CHANGE THIS: Use findOne({ _id: ... }) instead of findById()
    const university = await University.findOne({ _id: req.params.id });
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json(university);
  } catch (err) {
    // This catch block is what sends the 500 error
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new university
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    const university = await newUniversity.save();
    res.status(201).json(university);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT (update) an existing university
router.put("/:id", authMiddleware, async (req, res) => {
  // ADD THIS LINE EXACTLY AS IT IS
  console.log(
    "--- EXECUTING THE LATEST PUT ROUTE CODE FROM THE CORRECT FILE ---"
  );

  try {
    const university = await University.findOne({ _id: req.params.id });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    Object.assign(university, req.body);
    const updatedUniversity = await university.save();
    res.json(updatedUniversity);
  } catch (err) {
    // --- MODIFICATION START ---
    // Log the full error to the server console to see details
    console.error("UNIVERSITY SAVE FAILED:", err);

    // Check if it's a validation error and send a more specific response
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: err.errors });
    }

    // Otherwise, send a generic 500 error
    res.status(500).json({ message: "Server Error" });
    // --- MODIFICATION END ---
  }
});

// DELETE a university
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // USE findOne instead of findById
    const university = await University.findOne({ _id: req.params.id });
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    await university.deleteOne(); // Use deleteOne method on the document

    res.json({ message: "University deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
