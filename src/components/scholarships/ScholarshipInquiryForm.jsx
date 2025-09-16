import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiSend,
  FiAward,
} from "react-icons/fi";

const ScholarshipInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fieldOfStudy: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.fieldOfStudy) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit to a 'scholarship_inquiries' collection
      await addDoc(collection(db, "scholarship_inquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      toast.success(
        "Inquiry sent! We will contact you with relevant scholarships."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        fieldOfStudy: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting scholarship inquiry:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FiAward className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get Personalized Scholarship Alerts
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't see what you're looking for? Fill out the form below, and
            we'll notify you about scholarships that match your profile.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Form Fields */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                required
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="relative">
              <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="Intended Field of Study *"
                required
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any additional details (e.g., preferred countries, academic level)"
                rows="4"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors text-lg disabled:bg-yellow-300"
              >
                <FiSend className="mr-2" />
                {isSubmitting ? "Submitting..." : "Request Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipInquiryForm;
