// seedCourses.js
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("./models/Course");
const University = require("./models/University");

// ⚠️ Use the SAME URI your backend uses
const MONGO_URI = process.env.MONGO_URI;

const dataPath = path.join(__dirname, "courses.json");

// ---------- Helper Functions ----------

// A course is considered "active" if nextEarliestIntake year >= 2025
function isActiveCourse(c) {
  if (!c.nextEarliestIntake) return false;

  const parts = String(c.nextEarliestIntake).trim().split(" ");
  const year = parseInt(parts[parts.length - 1], 10);

  if (!year) return false;

  // You can tweak this later (for now: only 2025+)
  return year >= 2025;
}

// Ensure course has enough details to be shown in frontend
function hasEnoughDetails(c) {
  return (
    c.courseName &&
    c.universityId &&
    c.tuitionFee &&
    typeof c.tuitionFee.amountGBP === "number" &&
    c.degreeLevel &&
    c.category &&
    c.courseUrl
  );
}

// Choose a field of study string
function buildField(c) {
  if (Array.isArray(c.subStreams) && c.subStreams.length > 0) {
    return c.subStreams[0].name;
  }
  if (c.category) {
    return c.category.split(",")[0].trim();
  }
  return "";
}

// Build intake terms like ["JAN 2026", "SEP 2026"]
function buildIntakeTerms(c) {
  if (!Array.isArray(c.intakesOffered)) {
    return c.nextEarliestIntake ? [c.nextEarliestIntake] : [];
  }

  const terms = new Set();

  for (const raw of c.intakesOffered) {
    if (!raw) continue;
    const str = String(raw);

    const yearMatch = str.match(/'YEAR':\s*(\d{4})/);
    const monthMatch = str.match(/'MONTH':\s*'([A-Z]{3})'/);

    if (yearMatch && monthMatch) {
      const year = yearMatch[1];
      const month = monthMatch[1];
      terms.add(`${month} ${year}`);
    }
  }

  if (terms.size === 0 && c.nextEarliestIntake) {
    terms.add(c.nextEarliestIntake);
  }

  return Array.from(terms);
}

async function run() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("📄 Reading courses.json...");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const courses = JSON.parse(raw);

    console.log(`📚 Found ${courses.length} raw courses in JSON file.`);

    let inserted = 0;
    let skippedInactive = 0;
    let skippedLowDetail = 0;
    let skippedNoUniversity = 0;
    let skippedDuplicate = 0;

    for (const c of courses) {
      // 1. Only active courses
      if (!isActiveCourse(c)) {
        skippedInactive++;
        continue;
      }

      // 2. Filter out courses with very few details
      if (!hasEnoughDetails(c)) {
        skippedLowDetail++;
        continue;
      }

      const uniId = String(c.universityId);

      // 3. Only for universities that are already in our DB (your 10 universities)
      const uni = await University.findOne({ _id: uniId });
      if (!uni) {
        skippedNoUniversity++;
        continue;
      }

      const courseId = String(c.courseId);

      // 4. Avoid duplicates
      const existing = await Course.findOne({ _id: courseId });
      if (existing) {
        skippedDuplicate++;
        continue;
      }

      const doc = new Course({
        _id: courseId,
        name: c.courseName,
        description: "",

        field: buildField(c),
        level: c.degreeLevel,

        university: uniId,

        tuition: c.tuitionFee.amountGBP,
        currency: "GBP",
        durationMonths: c.durationMonths,
        mode: "Full-time",

        intakeTerms: buildIntakeTerms(c),
        applicationDeadline: null,

        scholarshipsAvailable: !!c.scholarshipsAvailable,
        courseUrl: c.courseUrl,

        avgSalary: "",
        imageUrl: c.imageUrl || uni.imageUrl || "",
      });

      await doc.save();
      console.log(`✅ Inserted course: ${c.courseName} (${uni.name})`);
      inserted++;
    }

    console.log("🎉 Course seeding complete.");
    console.log(`   Inserted:           ${inserted}`);
    console.log(`   Skipped inactive:   ${skippedInactive}`);
    console.log(`   Skipped low detail: ${skippedLowDetail}`);
    console.log(`   Skipped no uni:     ${skippedNoUniversity}`);
    console.log(`   Skipped duplicate:  ${skippedDuplicate}`);
  } catch (err) {
    console.error("❌ Error while seeding courses:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
}

run();
