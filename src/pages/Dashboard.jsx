import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";

// --- Reusable Edit Modal Component ---
const EditModal = ({ isOpen, onClose, item, type, onSave }) => {
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // When a new item is passed from the parent, update the modal's state
    if (item) {
      setEditData(item);
    }
  }, [item]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editData);
  };

  // --- FIX: Added optional chaining (?.) to safely access properties of editData ---
  // This prevents the "Cannot read properties of null" error.
  const renderUniversityForm = () => (
    <>
      <input
        name="name"
        value={editData?.name || ""}
        onChange={handleChange}
        placeholder="University Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="country"
        value={editData?.country || ""}
        onChange={handleChange}
        placeholder="Country"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="ranking"
        value={editData?.ranking || ""}
        onChange={handleChange}
        placeholder="World Ranking"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="tuition"
        value={editData?.tuition || ""}
        onChange={handleChange}
        placeholder="Tuition Fee ($)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="scholarshipsAvailable"
        value={editData?.scholarshipsAvailable || ""}
        onChange={handleChange}
        placeholder="Scholarships Available"
        className="w-full p-2 border rounded mb-2"
      />
    </>
  );

  const renderCourseForm = () => (
    <>
      <input
        name="name"
        value={editData?.name || ""}
        onChange={handleChange}
        placeholder="Course Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="universities"
        value={editData?.universities || ""}
        onChange={handleChange}
        placeholder="Universities Count"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="avgSalary"
        value={editData?.avgSalary || ""}
        onChange={handleChange}
        placeholder="Average Salary"
        className="w-full p-2 border rounded mb-2"
      />
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            Edit {type === "university" ? "University" : "Course"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === "university" ? renderUniversityForm() : renderCourseForm()}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [uniImageFile, setUniImageFile] = useState(null);
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [uniName, setUniName] = useState("");
  const [uniCountry, setUniCountry] = useState("");
  const [uniRanking, setUniRanking] = useState("");
  const [uniTuition, setUniTuition] = useState("");
  const [uniScholarships, setUniScholarships] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseUnis, setCourseUnis] = useState("");
  const [courseSalary, setCourseSalary] = useState("");
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editType, setEditType] = useState("");

  const fetchData = async () => {
    try {
      const uniSnapshot = await getDocs(collection(db, "universities"));
      setUniversities(
        uniSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const courseSnapshot = await getDocs(collection(db, "courses"));
      setCourses(
        courseSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not load existing data.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "StudyAbroad"); // Replace
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dldptzfhs/image/upload", // Replace
      formData
    );
    return res.data.secure_url;
  };

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    if (!uniName || !uniCountry || !uniImageFile)
      return toast.error("University Name, Country, and Image are required.");
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(uniImageFile);
      await addDoc(collection(db, "universities"), {
        name: uniName,
        country: uniCountry,
        ranking: uniRanking,
        tuition: Number(uniTuition),
        scholarshipsAvailable: Number(uniScholarships),
        imageUrl: imageUrl,
      });
      toast.success("University added successfully!");
      setUniName("");
      setUniCountry("");
      setUniRanking("");
      setUniTuition("");
      setUniScholarships("");
      setUniImageFile(null);
      e.target.reset();
      fetchData();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseName || !courseImageFile)
      return toast.error("Course Name and Image are required.");
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(courseImageFile);
      await addDoc(collection(db, "courses"), {
        name: courseName,
        universities: courseUnis,
        avgSalary: courseSalary,
        imageUrl: imageUrl,
      });
      toast.success("Course added successfully!");
      setCourseName("");
      setCourseUnis("");
      setCourseSalary("");
      setCourseImageFile(null);
      e.target.reset();
      fetchData();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item, type) => {
    setCurrentItem(item);
    setEditType(type);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (updatedItem) => {
    setLoading(true);
    const collectionName =
      editType === "university" ? "universities" : "courses";
    const docRef = doc(db, collectionName, updatedItem.id);
    try {
      const { id, ...dataToUpdate } = updatedItem;
      await updateDoc(docRef, dataToUpdate);
      toast.success(`${editType} updated successfully!`);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      toast.error(`Failed to update ${editType}.`);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, collectionName) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${collectionName.slice(0, -1)}?`
      )
    ) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, collectionName, id));
        toast.success("Item deleted successfully!");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete item.");
        console.error("Delete error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        item={currentItem}
        type={editType}
        onSave={handleSaveChanges}
      />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Manage Universities
            </h2>
            <form onSubmit={handleAddUniversity} className="space-y-4">
              <input
                type="text"
                value={uniName}
                onChange={(e) => setUniName(e.target.value)}
                placeholder="University Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={uniCountry}
                onChange={(e) => setUniCountry(e.target.value)}
                placeholder="Country"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={uniRanking}
                onChange={(e) => setUniRanking(e.target.value)}
                placeholder="World Ranking (e.g., #1)"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                value={uniTuition}
                onChange={(e) => setUniTuition(e.target.value)}
                placeholder="Tuition Fee ($)"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                value={uniScholarships}
                onChange={(e) => setUniScholarships(e.target.value)}
                placeholder="Scholarships Available (Number)"
                className="w-full p-2 border rounded"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University Image *
                </label>
                <input
                  type="file"
                  onChange={(e) => setUniImageFile(e.target.files[0])}
                  accept="image/*"
                  className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Add University"}
              </button>
            </form>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">
                Existing Universities: {universities.length}
              </h3>
              <ul className="list-none mt-2 text-gray-600 h-48 overflow-y-auto">
                {universities.map((uni) => (
                  <li
                    key={uni.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <span>
                      {uni.name}, {uni.country}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(uni, "university")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(uni.id, "universities")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Manage Popular Courses
            </h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={courseUnis}
                onChange={(e) => setCourseUnis(e.target.value)}
                placeholder="Universities Count (e.g., 1250+)"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={courseSalary}
                onChange={(e) => setCourseSalary(e.target.value)}
                placeholder="Average Salary (e.g., $95,000)"
                className="w-full p-2 border rounded"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image *
                </label>
                <input
                  type="file"
                  onChange={(e) => setCourseImageFile(e.target.files[0])}
                  accept="image/*"
                  className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Add Course"}
              </button>
            </form>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">
                Existing Courses: {courses.length}
              </h3>
              <ul className="list-none mt-2 text-gray-600 h-48 overflow-y-auto">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <span>{course.name}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(course, "course")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id, "courses")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
