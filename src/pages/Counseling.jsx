import React from "react";
import { Link } from "react-router-dom";

// Data for the pricing plans to keep the JSX clean
const plansData = [
  {
    name: "Basic",
    price: 49,
    description: "Perfect for quick questions and targeted advice.",
    features: [
      "Single 45-minute counseling session",
      "Profile evaluation",
      "University shortlisting (up to 3)",
      "Email support",
    ],
    isFeatured: false,
  },
  {
    name: "Standard",
    price: 1999,
    description:
      "Comprehensive assistance for your entire application process.",
    features: [
      "Everything in Basic",
      "5 one-on-one sessions",
      "End-to-end application assistance",
      "SOP/LOR review and editing",
      "Interview preparation",
    ],
    isFeatured: true,
  },
  {
    name: "Premium",
    price: 9999,
    description: "Our all-inclusive plan for complete peace of mind.",
    features: [
      "Everything in Standard",
      "Unlimited sessions",
      "Complete Visa application support",
      "Pre-departure guidance",
      "24/7 priority support",
    ],
    isFeatured: false,
  },
];

// Data for the FAQ section
const faqData = [
  {
    question: "Who are the counselors?",
    answer:
      "Our team consists of experienced education professionals who have graduated from top global universities and have extensive knowledge of the international admissions process.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade your plan at any time. You will only need to pay the difference in the plan costs.",
  },
  {
    question: "What is the success rate?",
    answer:
      "We have a 98% success rate in placing students in one of their top 5 university choices. Your success is our priority.",
  },
];

export default function Counseling() {
  return (
    <div className="bg-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Expert Guidance for Your Journey
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Choose a plan that fits your needs and let our experts guide you to
            your dream university.
          </p>
        </div>

        {/* Pricing Table Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plansData.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white p-8 rounded-2xl shadow-lg border-2 ${
                plan.isFeatured ? "border-yellow-500" : "border-gray-200"
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-bold bg-yellow-1000 text-gray-900">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <p className="mt-6">
                <span className="text-5xl font-extrabold text-gray-900">
                  ${plan.price.toLocaleString()}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /one-time
                </span>
              </p>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-10 block w-full py-3 px-6 rounded-lg text-center font-bold ${
                  plan.isFeatured
                    ? "bg-yellow-1000 text-gray-900 hover:bg-yellow-600"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 max-w-3xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
