import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories.jsx";

const Categories = () => {
  const [categories = []] = useCategories();
  console.log(categories);
  

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop by <span className="text-blue-600">Categories</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/${category.slug}`}
              key={category._id}
              className="group rounded-2xl overflow-hidden relative shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={category?.image}
                alt={category?.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300" />

              <h3 className="absolute bottom-0 left-0 right-0 text-white text-lg md:text-xl font-semibold text-center py-3 bg-primary-c bg-opacity-50">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
