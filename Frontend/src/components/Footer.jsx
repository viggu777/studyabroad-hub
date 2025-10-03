import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGlobe, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Social Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiGlobe className="text-3xl text-yellow-400" />
              <span className="text-2xl font-bold text-white">
                StudyAbroad Hub
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your compass to global education. We help you navigate your
              journey to studying at the world's top universities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Find Universities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Visa Guidance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Application Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Scholarship Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Education Lane, Knowledge Park, New Delhi, India
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-yellow-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="text-yellow-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@studyabroadhub.com"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  info@studyabroadhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            © {new Date().getFullYear()} StudyAbroad Hub. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
