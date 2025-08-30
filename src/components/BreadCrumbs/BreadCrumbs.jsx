import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const BreadCrumbs = ({ selectedCategory, selectedSubCategory }) => {
  // Breadcrumb parts
  const crumbs = [];

  if (selectedCategory && selectedCategory !== "All") {
    crumbs.push({
      name: selectedCategory,
      path: `/${encodeURIComponent(selectedCategory)}`,
    });
  }

  if (selectedSubCategory) {
    crumbs.push({
      name: selectedSubCategory,
      path: `/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(
        selectedSubCategory
      )}`,
    });
  }

  return (
    <nav className="flex text-sm mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home */}
        <li className="inline-flex items-center">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-700 hover:text-blue-600"
          >
            <FaHome className="mr-1" /> Home
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="inline-flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-500">{crumb.name}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-700 hover:text-blue-600"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
