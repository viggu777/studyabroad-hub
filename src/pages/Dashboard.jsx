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
const EditModal = ({ isOpen, onClose, item, onSave }) => {
  const [editData, setEditData] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

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
    // Pass both the text data and the new image file (if any)
    onSave(editData, newImageFile);
  };

  // --- FIX: Added optional chaining (?.) to safely access properties of editData ---
  // This prevents the "Cannot read properties of null" error.
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-800">Edit University</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {renderForm()}
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
  const [imageFile, setImageFile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editType, setEditType] = useState("university"); // Keep for now, might be useful later

  const fetchData = async () => {
    try {
      const uniSnapshot = await getDocs(collection(db, "universities"));
      setUniversities(
        uniSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not load existing data.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUniversity((prev) => ({ ...prev, [name]: value }));
  };

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
    if (!university.name || !university.country || !imageFile)
      return toast.error("University Name, Country, and Image are required.");
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      await addDoc(collection(db, "universities"), {
        ...university,
        tuition: Number(university.tuition) || 0,
        imageUrl: imageUrl,
      });
      toast.success("University added successfully!");
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

  const handleSaveChanges = async (updatedItem, newImageFile) => {
    setLoading(true);
    const collectionName =
      editType === "university" ? "universities" : "courses";
    const docRef = doc(db, collectionName, updatedItem.id);
    try {
      const { id, ...dataToUpdate } = updatedItem;

      // If a new image is provided, upload it and update the imageUrl
      if (newImageFile) {
        const newImageUrl = await uploadToCloudinary(newImageFile);
        dataToUpdate.imageUrl = newImageUrl;
      }

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
        onSave={handleSaveChanges}
      />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Add/Edit University
            </h2>
            <form onSubmit={handleAddUniversity} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={university.name}
                  onChange={handleFormChange}
                  placeholder="University Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="country"
                  value={university.country}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  placeholder="Location (e.g., City, State)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="ranking"
                  value={university.ranking}
                  onChange={handleFormChange}
                  placeholder="World Ranking (e.g., QS: #1)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="tuition"
                  value={university.tuition}
                  onChange={handleFormChange}
                  placeholder="Tuition Fee (USD)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="requiredExams"
                  value={university.requiredExams}
                  onChange={handleFormChange}
                  placeholder="Exams (e.g., SAT, IELTS)"
                  className="w-full p-2 border rounded"
                />
              </div>
              <textarea
                name="description"
                value={university.description}
                onChange={handleFormChange}
                placeholder="University Description"
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
              <textarea
                name="courses"
                value={university.courses}
                onChange={handleFormChange}
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

          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Existing Universities ({universities.length})
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <ul className="list-none mt-2 text-gray-600">
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
