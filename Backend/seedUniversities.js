// seedUniversities.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const University = require("./models/University");

// 🔹 Use your existing Mongo URI here (same as in your main server)
const MONGO_URI = process.env.MONGO_URI;

// Path to the JSON file you uploaded
const dataPath = path.join(__dirname, "universities.json");

async function run() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("📄 Reading universities.json...");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const universities = JSON.parse(raw);

    console.log(`📚 Found ${universities.length} universities in JSON file.`);

    let inserted = 0;
    let skipped = 0;

    for (const uni of universities) {
      // Check if a university with the same name already exists
      const existing = await University.findOne({
        name: uni.universityName,
      });

      if (existing) {
        console.log(`⏭️  Skipping (already exists): ${uni.universityName}`);
        skipped++;
        continue;
      }

      const locationParts = [];
      if (uni.city) locationParts.push(uni.city);
      if (uni.state) locationParts.push(uni.state);
      const location = locationParts.join(", ");

      const rankingValue =
        uni.ranking && uni.ranking.qsRank ? String(uni.ranking.qsRank) : "";

      const doc = new University({
        _id: String(uni.universityId), // e.g. "990"
        name: uni.universityName,
        location: location,
        country: uni.country || "",
        website: "", // you can update this later
        description: "",
        courses: "",
        imageUrl: uni.imageUrl || "",
        ranking: rankingValue,
        tuition: undefined,
        scholarshipsAvailable: false,
        requiredExams: "",
      });

      await doc.save();
      console.log(`✅ Inserted: ${uni.universityName}`);
      inserted++;
    }

    console.log("🎉 Seeding complete.");
    console.log(`   Inserted: ${inserted}`);
    console.log(`   Skipped (already existed): ${skipped}`);
  } catch (err) {
    console.error("❌ Error while seeding universities:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
}

run();
