import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apiClient from "../api";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";

// --- Reusable Edit Modal Component ---
// --- Reusable Edit Modal Component ---
const EditModal = ({ isOpen, onClose, item, onSave, editType }) => {
  // --- THE FIX ---
  // Initialize state only when the modal is opened with a valid item.
  // This "snapshots" the data.
  const [editData, setEditData] = useState({});
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    if (isOpen && item) {
      setEditData(item || {});
    }
  }, [isOpen, item]);

  // --- SOLUTION PART 1: PREVENT PREMATURE RENDER ---
  // Do not render the modal's content until the data is loaded into state.
  // This prevents the race condition where handleChange runs on a null state.
  if (!isOpen || !editData) {
    return null; // Or a loading spinner
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // --- THE DEFINITIVE FIX ---
  // The `editData` state can lose the ID on change. We must re-add it
  // from the original, stable `item` prop on every submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure the _id is always present for the save operation
    const dataToSave = { ...editData, _id: item._id };
    onSave(dataToSave, newImageFile, editType);
  };

  const renderForm = () => (
    <div className="space-y-3">
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
      <textarea
        name="description"
        value={editData?.description || ""}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows="3"
      />
      <input
        name="location"
        value={editData?.location || ""}
        onChange={handleChange}
        placeholder="Location (e.g., City, State)"
        className="w-full p-2 border rounded"
      />
      <input
        name="courses"
        value={editData?.courses || ""}
        onChange={handleChange}
        placeholder="Courses (comma-separated)"
        className="w-full p-2 border rounded"
      />
      <input
        name="requiredExams"
        value={editData?.requiredExams || ""}
        onChange={handleChange}
        placeholder="Required Exams (e.g., SAT, IELTS)"
        className="w-full p-2 border rounded"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Update Image (optional)
        </label>
        {editData?.imageUrl && (
          <img
            src={editData.imageUrl}
            alt="Current"
            className="w-24 h-24 object-cover rounded-md my-2"
          />
        )}
        <input
          type="file"
          onChange={(e) => setNewImageFile(e.target.files[0])}
          accept="image/*"
          className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
        />
      </div>
    </div>
  );

  const renderCourseForm = () => (
    <div className="space-y-3">
      <input
        name="name"
        value={editData?.name || ""}
        onChange={handleChange}
        placeholder="Course Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="field"
        value={editData?.field || ""}
        onChange={handleChange}
        placeholder="Field of Study"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="level"
        value={editData?.level || ""}
        onChange={handleChange}
        placeholder="Degree Level (e.g., Bachelors, Masters)"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        value={editData?.description || ""}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows="3"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-800">
            Edit {editType === "university" ? "University" : "Course"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {editType === "university" ? renderForm() : renderCourseForm()}
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

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [university, setUniversity] = useState({
    name: "",
    country: "USA",
    location: "",
    ranking: "",
    description: "",
    tuition: "",
    courses: "",
    requiredExams: "",
  });
  const [course, setCourse] = useState({
    name: "",
    field: "",
    level: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editType, setEditType] = useState("university");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uniResponse, courseResponse] = await Promise.all([
        apiClient.get("/universities"),
        apiClient.get("/courses"),
      ]);

      setUniversities(uniResponse.data || []);
      setCourses(courseResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not load existing data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUniversityFormChange = (e) => {
    const { name, value } = e.target;
    setUniversity((prev) => ({ ...prev, [name]: value }));
  };

  // This function was missing its definition start
  const handleCourseFormChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "StudyAbroad"); // Your Cloudinary upload preset
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dldptzfhs/image/upload", // Your Cloudinary URL
      formData
    );
    return res.data.secure_url;
  };

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    if (!university.name || !university.country || !imageFile)
      return toast.error("University Name, Country, and Image are required.");
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      await apiClient.post("/universities", {
        ...university,
        tuition: Number(university.tuition) || 0,
        imageUrl: imageUrl,
      });
      setUniversity({
        name: "",
        country: "USA",
        location: "",
        ranking: "",
        description: "",
        tuition: "",
        courses: "",
        requiredExams: "",
      });
      setImageFile(null);
      e.target.reset();
      fetchData();
      toast.success("University added successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!course.name || !course.field || !course.level)
      return toast.error("Course Name, Field, and Level are required.");
    setLoading(true);
    try {
      await apiClient.post("/courses", course);
      setCourse({
        name: "",
        field: "",
        level: "",
        description: "",
      });
      fetchData(); // Refetch both courses and universities
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error(`Error adding course: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item, type) => {
    setCurrentItem(item);
    setEditType(type);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (updatedItem, newImageFile, type) => {
    setLoading(true);
    const endpoint =
      type === "university"
        ? `/universities/${currentItem._id}`
        : `/courses/${currentItem._id}`; // Corrected endpoint for courses
    try {
      // The `updatedItem` from the modal now reliably contains the ID.
      // We use `_id` because that's what the backend API endpoint expects.
      const { id, _id, ...dataToUpdate } = updatedItem;
      if (!currentItem._id) {
        throw new Error("Cannot save changes: The item ID is missing.");
      }

      if (newImageFile && type === "university") {
        const newImageUrl = await uploadToCloudinary(newImageFile);
        dataToUpdate.imageUrl = newImageUrl;
      }
      await apiClient.put(endpoint, dataToUpdate);

      toast.success(`${type} updated successfully!`);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      toast.error(`Failed to update ${type}.`);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setLoading(true);
      const endpoint =
        type === "university"
          ? `/universities/${item._id}`
          : `/courses/${item._id}`;
      try {
        if (!item._id) {
          toast.error("Cannot delete: Item ID is missing.");
          setLoading(false);
          return;
        }
        await apiClient.delete(endpoint);
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
        onClose={() => {
          setShowEditModal(false);
          setCurrentItem(null); // Reset the current item on close
        }}
        item={currentItem}
        onSave={handleSaveChanges}
        editType={editType}
      />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Add University
            </h2>
            <form onSubmit={handleAddUniversity} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={university.name}
                  onChange={handleUniversityFormChange}
                  placeholder="University Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="country"
                  value={university.country}
                  onChange={handleUniversityFormChange}
                  className="w-full p-2 border rounded bg-white"
                  required
                >
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  name="location"
                  value={university.location}
                  onChange={handleUniversityFormChange}
                  placeholder="Location (e.g., City, State)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="ranking"
                  value={university.ranking}
                  onChange={handleUniversityFormChange}
                  placeholder="World Ranking (e.g., QS: #1)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="tuition"
                  value={university.tuition}
                  onChange={handleUniversityFormChange}
                  placeholder="Tuition Fee (USD)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="requiredExams"
                  value={university.requiredExams}
                  onChange={handleUniversityFormChange}
                  placeholder="Exams (e.g., SAT, IELTS)"
                  className="w-full p-2 border rounded"
                />
              </div>
              <textarea
                name="description"
                value={university.description}
                onChange={handleUniversityFormChange}
                placeholder="University Description"
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
              <textarea
                name="courses"
                value={university.courses}
                onChange={handleUniversityFormChange}
                placeholder="Popular Courses (comma-separated)"
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University Image *
                </label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
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
          </div>

          {/* Add Course Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Add Course
            </h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input
                type="text"
                name="name"
                value={course.name}
                onChange={handleCourseFormChange}
                placeholder="Course Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="field"
                value={course.field}
                onChange={handleCourseFormChange}
                placeholder="Field of Study (e.g., Engineering)"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="level"
                value={course.level}
                onChange={handleCourseFormChange}
                placeholder="Degree Level (e.g., Masters)"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Add Course"}
              </button>
            </form>
          </div>

          {/* Existing Universities List */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Existing Universities ({universities.length})
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <ul className="list-none mt-2 text-gray-600">
                {universities.map((uni) => (
                  <li
                    key={uni._id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={uni.imageUrl}
                        alt={uni.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>
                        {uni.name}, {uni.country}
                      </span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(uni, "university")}
                        className="text-blue-500 hover:text-blue-700 p-1"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(uni, "university")}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Existing Courses List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Existing Courses ({courses.length})
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <ul className="list-none mt-2 text-gray-600">
                {courses.map((c) => (
                  <li
                    key={c._id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <span>
                      {c.name} ({c.level})
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(c, "course")}
                        className="text-blue-500 hover:text-blue-700 p-1"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(c, "course")}
                        className="text-red-500 hover:text-red-700 p-1"
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
