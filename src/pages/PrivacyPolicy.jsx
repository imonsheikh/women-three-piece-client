import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          <strong>Noor Fashion </strong> values your privacy
        , we understand the importance of handling your personal information responsibly. We are committed to safeguarding your data with care and integrity.
        </p>

        <p className="text-gray-700 mb-4">
          Please take a moment to read this Privacy Policy carefully. By using the services provided by Noor Fashion, you consent to the collection, use, and management of your information as described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Policy Updates</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy periodically. Any changes will be clearly posted on our website and take effect immediately. Your continued use of our services after such updates constitutes acceptance of the revised policy.
        </p>

        <p className="text-gray-700 mb-4">
          At <strong>Noor Fashion </strong>, we strive to maintain your trust by ensuring that your personal information is managed securely, transparently, and responsibly.
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
