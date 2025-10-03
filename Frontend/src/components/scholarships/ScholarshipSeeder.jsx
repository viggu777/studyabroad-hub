import React, { useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  writeBatch,
  doc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { FiDatabase } from "react-icons/fi";

// Sample data to be seeded
const sampleScholarships = [
  {
    name: "Global Leader Scholarship",
    description:
      "Awarded to international students who demonstrate outstanding leadership qualities and academic excellence. For undergraduate and postgraduate studies.",
    amount: "$10,000",
    eligibility: "International Students, All Fields",
    link: "https://example.com/global-leader-scholarship",
  },
  {
    name: "STEM Future Innovators Grant",
    description:
      "A grant for students pursuing a degree in Science, Technology, Engineering, or Mathematics at a partner university in the USA.",
    amount: "$5,000 per year",
    eligibility: "STEM fields, USA",
    link: "https://example.com/stem-grant",
  },
  {
    name: "Creative Arts & Design Fund",
    description:
      "Supports talented students in the fields of fine arts, design, and architecture studying in the United Kingdom.",
    amount: "Full Tuition Waiver",
    eligibility: "Arts & Design, UK",
    link: "https://example.com/arts-fund",
  },
  {
    name: "Canadian Experience Scholarship",
    description:
      "For students who have prior volunteer or work experience and are planning to study a Master's program in Canada.",
    amount: "$8,000 CAD",
    eligibility: "Masters Students, Canada",
    link: "https://example.com/canadian-experience",
  },
  {
    name: "Australian Outback Studies Grant",
    description:
      "A unique grant for students interested in environmental science and biology, with a focus on Australian ecosystems.",
    amount: "$15,000 AUD",
    eligibility: "Environmental Science, Australia",
    link: "https://example.com/outback-grant",
  },
];

const ScholarshipSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedData = async () => {
    setIsSeeding(true);
    const scholarshipsCollection = collection(db, "scholarships");

    // 1. Check if data already exists to prevent duplicates
    try {
      const existingDataQuery = query(scholarshipsCollection, limit(1));
      const existingDataSnapshot = await getDocs(existingDataQuery);
      if (!existingDataSnapshot.empty) {
        toast.info("Scholarship data already exists. Seeding is not required.");
        setIsSeeding(false);
        return;
      }

      // 2. If no data, proceed with seeding
      const batch = writeBatch(db);
      sampleScholarships.forEach((scholarship) => {
        // Use doc(collectionRef) to get a new doc reference with an auto-id
        const docRef = doc(scholarshipsCollection);
        batch.set(docRef, scholarship);
      });
      await batch.commit();
      toast.success(
        `${sampleScholarships.length} scholarships have been added! Please refresh the page.`
      );
    } catch (error) {
      console.error("Error seeding scholarships:", error);
      toast.error("Failed to seed scholarships. See console for details.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="bg-yellow-50 p-4 my-8 max-w-7xl mx-auto rounded-lg border-l-4 border-yellow-400">
      <h4 className="font-bold text-yellow-800">Developer Tool</h4>
      <p className="text-sm text-yellow-700 mb-3">
        This button adds sample scholarship data to your database. It will only
        run if the collection is empty.
        <br />
        <strong>Note:</strong> You must be logged in as an admin to use this.
      </p>
      <button
        onClick={handleSeedData}
        disabled={isSeeding}
        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 disabled:bg-yellow-300 flex items-center"
      >
        <FiDatabase className="mr-2" />
        {isSeeding ? "Seeding Data..." : "Seed Scholarship Data"}
      </button>
    </div>
  );
};

export default ScholarshipSeeder;
