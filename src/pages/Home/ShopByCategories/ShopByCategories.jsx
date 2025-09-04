import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useCategories from "../../../hooks/useCategories.jsx";

const ShopByCategories = () => {
  const [categories = []] = useCategories();

  // Show only 4 categories
  const displayedCategories = categories.slice(0, 4);

  return (
    <section className="md:py-6">
      <div className="mx-auto md:px-4 px-1">
        <SectionTitle heading={'Shop by Categories'}>Shop by Categories</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-1">
          {displayedCategories.map((category) => (
            <Link
              to={`/${encodeURIComponent(category.name)}`}
              key={category._id}
              className="group rounded-2xl overflow-hidden relative shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={category?.image}
                alt={category?.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />

              <h3 className="absolute bottom-0 left-0 right-0 text-white text-sm md:text-lg font-semibold text-center py-3 bg-primary-c bg-opacity-70">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {categories.length > 4 && (
          <div className="mt-3 md:mt-4 text-center">
            <Link
              to="/categories"
              className="inline-block bg-primary-c font-semibold text-white px-6 py-2 rounded-full hover:bg-primary transition text-sm"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategories;
