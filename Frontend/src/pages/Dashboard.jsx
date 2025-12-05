import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apiClient from "../api";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";

// --- Reusable Edit Modal Component ---
const EditModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  editType,
  universities,
}) => {
  const [editData, setEditData] = useState({});
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    if (isOpen && item) {
      let baseItem = item || {};
      // If editing a course and university is populated, convert to _id
      if (
        editType === "course" &&
        item.university &&
        typeof item.university === "object"
      ) {
        baseItem = { ...item, university: item.university._id };
      }
      setEditData(baseItem);
    }
  }, [isOpen, item, editType]);

  if (!isOpen || !editData) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setEditData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...editData, _id: item._id };
    onSave(dataToSave, newImageFile, editType);
  };

  const renderUniversityForm = () => (
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

      {/* University select */}
      <select
        name="university"
        value={editData?.university || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white"
      >
        <option value="">Select University</option>
        {(universities || []).map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.country})
          </option>
        ))}
      </select>

      <input
        type="number"
        name="tuition"
        value={editData?.tuition || ""}
        onChange={handleChange}
        placeholder="Tuition Fee"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="currency"
        value={editData?.currency || ""}
        onChange={handleChange}
        placeholder="Currency (e.g., USD, GBP)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="durationMonths"
        value={editData?.durationMonths || ""}
        onChange={handleChange}
        placeholder="Duration (months)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="mode"
        value={editData?.mode || ""}
        onChange={handleChange}
        placeholder="Mode (e.g., Full-time)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="intakeTerms"
        value={editData?.intakeTerms || ""}
        onChange={handleChange}
        placeholder="Intake Terms (comma-separated)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        name="applicationDeadline"
        value={
          editData?.applicationDeadline
            ? editData.applicationDeadline.slice(0, 10)
            : ""
        }
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="scholarshipsAvailable"
          checked={!!editData?.scholarshipsAvailable}
          onChange={handleChange}
        />
        <span>Scholarships Available</span>
      </label>
      <input
        name="courseUrl"
        value={editData?.courseUrl || ""}
        onChange={handleChange}
        placeholder="Course URL"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="avgSalary"
        value={editData?.avgSalary || ""}
        onChange={handleChange}
        placeholder="Average Salary (optional)"
        className="w-full p-2 border rounded mb-2"
      />

      {/* 🔹 Add this for course image editing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Image (optional)
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
          {editType === "university"
            ? renderUniversityForm()
            : renderCourseForm()}
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
    university: "",
    tuition: "",
    currency: "",
    durationMonths: "",
    mode: "",
    intakeTerms: "",
    applicationDeadline: "",
    scholarshipsAvailable: false,
    courseUrl: "",
    avgSalary: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editType, setEditType] = useState("university");
  const [courseImageFile, setCourseImageFile] = useState(null); // 👈 NEW

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

  const handleCourseFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCourse((prev) => ({ ...prev, [name]: val }));
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
    if (!course.name || !course.field || !course.level || !course.university)
      return toast.error(
        "Course Name, Field, Level, and University are required."
      );

    setLoading(true);
    try {
      // 🔹 Generate a unique string _id for the new course
      const generatedId =
        "course_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);

      const payload = {
        ...course,
        _id: generatedId,
        tuition: course.tuition ? Number(course.tuition) : undefined,
        durationMonths: course.durationMonths
          ? Number(course.durationMonths)
          : undefined,
        scholarshipsAvailable: !!course.scholarshipsAvailable,
        intakeTerms: course.intakeTerms
          ? course.intakeTerms
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      if (course.applicationDeadline) {
        payload.applicationDeadline = new Date(course.applicationDeadline);
      }

      // 🔹 Image handling for course
      if (courseImageFile) {
        // If admin uploads a course image, use that
        const imageUrl = await uploadToCloudinary(courseImageFile);
        payload.imageUrl = imageUrl;
      } else {
        // Otherwise, fallback to the selected university's image
        const uni = universities.find((u) => u._id === course.university);
        if (uni && uni.imageUrl) {
          payload.imageUrl = uni.imageUrl;
        }
      }

      await apiClient.post("/courses", payload);

      setCourse({
        name: "",
        field: "",
        level: "",
        description: "",
        university: "",
        tuition: "",
        currency: "",
        durationMonths: "",
        mode: "",
        intakeTerms: "",
        applicationDeadline: "",
        scholarshipsAvailable: false,
        courseUrl: "",
        avgSalary: "",
      });
      setCourseImageFile(null); // 👈 reset course image

      fetchData(); // Refetch both courses and universities
      toast.success("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
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
        : `/courses/${currentItem._id}`;
    try {
      const { id, _id, ...dataToUpdate } = updatedItem;
      if (!currentItem._id) {
        throw new Error("Cannot save changes: The item ID is missing.");
      }

      // 🔹 Upload new image for either university or course if provided
      if (newImageFile) {
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
          setCurrentItem(null);
        }}
        item={currentItem}
        onSave={handleSaveChanges}
        editType={editType}
        universities={universities}
      />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add University Form */}
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
              <textarea
                name="description"
                value={course.description}
                onChange={handleCourseFormChange}
                placeholder="Course Description"
                className="w-full p-2 border rounded"
                rows="3"
              ></textarea>

              {/* University dropdown */}
              <select
                name="university"
                value={course.university}
                onChange={handleCourseFormChange}
                className="w-full p-2 border rounded bg-white"
                required
              >
                <option value="">Select University</option>
                {universities.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.country})
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="tuition"
                value={course.tuition}
                onChange={handleCourseFormChange}
                placeholder="Tuition Fee"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="currency"
                value={course.currency}
                onChange={handleCourseFormChange}
                placeholder="Currency (e.g., USD, GBP)"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="durationMonths"
                value={course.durationMonths}
                onChange={handleCourseFormChange}
                placeholder="Duration (months)"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="mode"
                value={course.mode}
                onChange={handleCourseFormChange}
                placeholder="Mode (e.g., Full-time)"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="intakeTerms"
                value={course.intakeTerms}
                onChange={handleCourseFormChange}
                placeholder="Intake Terms (comma-separated)"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="applicationDeadline"
                value={course.applicationDeadline}
                onChange={handleCourseFormChange}
                className="w-full p-2 border rounded"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="scholarshipsAvailable"
                  checked={course.scholarshipsAvailable}
                  onChange={handleCourseFormChange}
                />
                <span>Scholarships Available</span>
              </label>
              <input
                type="text"
                name="courseUrl"
                value={course.courseUrl}
                onChange={handleCourseFormChange}
                placeholder="Course URL"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="avgSalary"
                value={course.avgSalary}
                onChange={handleCourseFormChange}
                placeholder="Average Salary (optional)"
                className="w-full p-2 border rounded"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setCourseImageFile(e.target.files[0])}
                  accept="image/*"
                  className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If no image is uploaded, the university image will be used by
                  default.
                </p>
              </div>

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
                      {uni.imageUrl && (
                        <img
                          src={uni.imageUrl}
                          alt={uni.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
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
                      {c.university &&
                      typeof c.university === "object" &&
                      c.university.name
                        ? ` – ${c.university.name}`
                        : ""}
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
