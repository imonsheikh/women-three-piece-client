import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome, {user?.displayName || "User"} 👋
      </h1>
      <p className="text-gray-600 mb-6">
        Here’s your account overview and quick actions.
      </p>

      {/* Profile Overview */}
      <div className="max-w-3xl border rounded-xl shadow p-6 bg-gray-50 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          👤 Your Information
        </h2>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="text-gray-700 text-sm space-y-1">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {user?.displayName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {user?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/shop">
          <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-5 text-center hover:bg-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              🛍️ Browse Products
            </h2>
            <p className="text-gray-500 text-sm">
              Check out new and trending items
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
