// backend/migrate.js
require("dotenv").config();
const { MongoClient } = require("mongodb");
const admin = require("firebase-admin");

// --- CONFIGURATION ---
// Import your Firebase service account key
const serviceAccount = require("./serviceAccountKey.json");

// The collections you want to migrate
const collectionsToMigrate = ["inquiries", "courses", "scholarships", "users"];

// --- INITIALIZE DATABASES ---

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Initialize MongoDB Client
const mongoUri = process.env.MONGO_URI;
const mongoClient = new MongoClient(mongoUri);

/**
 * Migrates a single collection from Firestore to MongoDB.
 * @param {string} collectionName The name of the collection to migrate.
 * @param {Db} mongoDb The MongoDB database instance.
 */
async function migrateCollection(collectionName, mongoDb) {
  console.log(`Starting migration for collection: ${collectionName}...`);

  const firestoreCollectionRef = firestore.collection(collectionName);
  const mongoCollection = mongoDb.collection(collectionName);

  // Get all documents from the Firestore collection
  const snapshot = await firestoreCollectionRef.get();

  if (snapshot.empty) {
    console.log(
      `No documents found in Firestore collection '${collectionName}'. Skipping.`
    );
    return;
  }

  // Prepare bulk operations for MongoDB to perform "upserts"
  const bulkOps = snapshot.docs.map((doc) => {
    return {
      updateOne: {
        filter: { _id: doc.id }, // Match by the original Firestore ID
        update: { $set: doc.data() }, // Set the new data
        upsert: true, // This is the key: insert if it doesn't exist, update if it does
      },
    };
  });

  // Execute the bulk write operation if there are documents to migrate
  if (bulkOps.length > 0) {
    const result = await mongoCollection.bulkWrite(bulkOps);
    console.log(
      `Migration for '${collectionName}' complete. Inserted: ${result.insertedCount}, Updated: ${result.modifiedCount}, Upserted: ${result.upsertedCount}.`
    );
  }
}

async function runMigration() {
  try {
    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db("StudyAbroad");
    console.log("Connected successfully to MongoDB for migration.");

    // Migrate each collection specified in the array
    for (const collection of collectionsToMigrate) {
      await migrateCollection(collection, db);
    }
  } catch (error) {
    console.error("An error occurred during migration:", error);
  } finally {
    // Ensure the MongoDB client is closed
    await mongoClient.close();
    console.log("Migration complete. MongoDB connection closed.");
  }
}

// Run the migration process
runMigration();
