import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

// --- International University Seed Data ---
const universitiesToSeed = [
  {
    name: "Massachusetts Institute of Technology (MIT)",
    country: "USA",
    location: "Cambridge, Massachusetts",
    ranking: "QS World Ranking: #1",
    description:
      "MIT is a world-renowned private research university known for its rigorous academic programs in science, engineering, and technology. It's a hub of innovation and cutting-edge research.",
    tuition: 55878,
    courses:
      "Computer Science, Mechanical Engineering, Physics, Economics, Architecture, AI & Machine Learning",
    requiredExams: "SAT/ACT, TOEFL/IELTS",
    imageUrl:
      "https://images.unsplash.com/photo-1620723389895-397a3543372f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "University of Oxford",
    country: "UK",
    location: "Oxford, England",
    ranking: "QS World Ranking: #3",
    description:
      "The oldest university in the English-speaking world, Oxford is a collegiate research university famed for its humanities, law, and medical programs, and its tutorial-based teaching style.",
    tuition: 35000, // Approx. in USD for international students
    courses:
      "Law, Medicine, Philosophy, Politics and Economics (PPE), History, English Literature",
    requiredExams: "A-Levels/IB, IELTS/TOEFL",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465423-e785349a691c?q=80&w=1932&auto=format&fit=crop",
  },
  {
    name: "University of Toronto",
    country: "Canada",
    location: "Toronto, Ontario",
    ranking: "Times Higher Education: #21",
    description:
      "A global leader in research and teaching, the University of Toronto is a public research university that offers a diverse range of programs and is known for its vibrant, multicultural campus life.",
    tuition: 45600, // Approx. in USD for international students
    courses:
      "Computer Science, Commerce, Life Sciences, Engineering, Nursing, Public Health",
    requiredExams: "IELTS/TOEFL, Specific program prerequisites",
    imageUrl:
      "https://images.unsplash.com/photo-1599895633283-04e7b1a09a47?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "The University of Melbourne",
    country: "Australia",
    location: "Melbourne, Victoria",
    ranking: "QS World Ranking: #14",
    description:
      "A public research university located in Melbourne, Australia. It is the country's second oldest university and is consistently ranked among the leading universities in the world.",
    tuition: 34000, // Approx. in USD for international students
    courses: "Business, Law, Engineering, Arts, Medicine, Data Science",
    requiredExams: "IELTS/TOEFL/PTE",
    imageUrl:
      "https://images.unsplash.com/photo-1588533590399-4b7633105333?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Technical University of Munich (TUM)",
    country: "Germany",
    location: "Munich, Bavaria",
    ranking: "QS World Ranking: #37",
    description:
      "One of Europe's leading research universities, with a strong focus on engineering, technology, and natural sciences. Many programs are taught in English, and public universities in Germany have very low or no tuition fees.",
    tuition: 300, // Approx. semester contribution fee in USD
    courses:
      "Informatics, Mechanical Engineering, Electrical Engineering, Management and Technology, Physics",
    requiredExams:
      "German Language Proficiency (for some courses), GRE, TOEFL/IELTS",
    imageUrl:
      "https://images.unsplash.com/photo-1629051871926-97053c535138?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Stanford University",
    country: "USA",
    location: "Stanford, California",
    ranking: "QS World Ranking: #5",
    description:
      "Located in the heart of Silicon Valley, Stanford University is renowned for its entrepreneurial spirit, research excellence, and close ties to the tech industry. It offers a wide range of programs in humanities, sciences, and engineering.",
    tuition: 61731,
    courses:
      "Computer Science, Business, Engineering, Law, Human Biology, Political Science",
    requiredExams: "SAT/ACT, TOEFL/IELTS",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Harvard University",
    country: "USA",
    location: "Cambridge, Massachusetts",
    ranking: "QS World Ranking: #4",
    description:
      "As the oldest institution of higher learning in the United States, Harvard offers a prestigious and comprehensive academic experience. It is globally recognized for its influential alumni and extensive research facilities.",
    tuition: 57261,
    courses:
      "Law, Business Administration (MBA), Medicine, Economics, Social Sciences, Government",
    requiredExams: "SAT/ACT, TOEFL/IELTS",
    imageUrl:
      "https://images.unsplash.com/photo-1606823514354-58c316cf50c4?q=80&w=1932&auto=format&fit=crop",
  },
  {
    name: "University of Cambridge",
    country: "UK",
    location: "Cambridge, England",
    ranking: "QS World Ranking: #2",
    description:
      "A collegiate public research university in Cambridge, England. Founded in 1209, Cambridge is the second-oldest university in the English-speaking world and is known for its academic rigor and historic colleges.",
    tuition: 37000, // Approx. in USD
    courses:
      "Natural Sciences, Mathematics, Law, Engineering, History, Computer Science",
    requiredExams: "A-Levels/IB, IELTS/TOEFL",
    imageUrl:
      "https://images.unsplash.com/photo-1543880941-81b444a70933?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "ETH Zurich",
    country: "Other", // Switzerland
    location: "Zürich, Switzerland",
    ranking: "QS World Ranking: #7",
    description:
      "ETH Zurich is a public research university in Zürich, Switzerland. It specializes in science, technology, engineering, and mathematics and has a strong reputation for cutting-edge research and innovation.",
    tuition: 1600, // Approx. in USD per year
    courses:
      "Architecture, Civil Engineering, Computer Science, Physics, Chemistry, Earth Sciences",
    requiredExams:
      "University-specific entrance exam, German/English proficiency",
    imageUrl:
      "https://images.unsplash.com/photo-1617893923333-f9589689a35c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "National University of Singapore (NUS)",
    country: "Other", // Singapore
    location: "Singapore",
    ranking: "QS World Ranking: #8",
    description:
      "NUS is a national collegiate research university in Singapore. It is the oldest autonomous university in the country and is considered one of the most prestigious academic institutions in Asia-Pacific.",
    tuition: 25000, // Approx. in USD
    courses:
      "Business Analytics, Computer Engineering, Law, Public Policy, Social Work, Industrial Design",
    requiredExams: "IELTS/TOEFL, SAT/ACT (for some programs)",
    imageUrl:
      "https://images.unsplash.com/photo-1580984969398-95b69580a2b8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "University of British Columbia (UBC)",
    country: "Canada",
    location: "Vancouver, British Columbia",
    ranking: "Times Higher Education: #41",
    description:
      "UBC is a public research university with campuses in Vancouver and Kelowna. It is a global centre for research and teaching, consistently ranked among the top 20 public universities in the world.",
    tuition: 35000, // Approx. in USD
    courses:
      "Forestry, Geography, Kinesiology, International Relations, Marketing, Film Production",
    requiredExams: "IELTS/TOEFL, Program-specific requirements",
    imageUrl:
      "https://images.unsplash.com/photo-1616587410513-c53a4a35f755?q=80&w=2070&auto=format&fit=crop",
  },
];

/**
 * Seeds the 'universities' collection in Firestore with initial data.
 * Checks for existing universities by name to avoid duplicates.
 */
export const seedUniversities = async () => {
  console.log("Starting to seed universities...");
  const universitiesCollection = collection(db, "universities");

  for (const uni of universitiesToSeed) {
    try {
      // Check if a university with the same name already exists
      const q = query(universitiesCollection, where("name", "==", uni.name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no university with that name exists, add it
        await addDoc(universitiesCollection, uni);
        console.log(`Added: ${uni.name}`);
      } else {
        console.log(`Skipped (already exists): ${uni.name}`);
      }
    } catch (error) {
      console.error(`Error adding ${uni.name}:`, error);
    }
  }

  console.log("University seeding process complete.");
};
