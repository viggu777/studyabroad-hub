import React, { useState } from "react";
import { db } from "../firebase/config"; // Make sure this path is correct
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiSend,
  FiAward,
  FiBookOpen,
  FiHome,
  FiDollarSign,
} from "react-icons/fi";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.country
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      toast.success("Your inquiry has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", country: "", message: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* --- UPDATED: Left Info Column (No Image) --- */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Journey to Global Education Starts Here
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fill out the form, and our expert counselors will help you with
              every step, from finding the right course to securing your visa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiAward className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">
                  Find Scholarships
                </h4>
                <p className="text-sm text-gray-600">
                  Access our database of funding opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiBookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Explore Courses</h4>
                <p className="text-sm text-gray-600">
                  Discover programs that match your passion.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiHome className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Best Colleges</h4>
                <p className="text-sm text-gray-600">
                  Get shortlisted for top-tier universities.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Education Loans</h4>
                <p className="text-sm text-gray-600">
                  We assist with financial planning and loan applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Request a Free Consultation
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Country *
              </label>
              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none appearance-none"
                >
                  <option value="">Select a Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors text-lg disabled:bg-yellow-300"
              >
                <FiSend className="mr-2" />
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
