import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";

const AllCategories = () => {
  const [categories = []] = useCategories();

  return (
    <section className="md:py-6 bg-white">
      <div className="max-w-7xl mx-auto md:px-4">
       <SectionTitle heading={'All Categories'}/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2">
          {categories.map((category) => (
            <Link
              to={`/${encodeURIComponent(category.name)}`}
              key={category._id}
              className="group md:rounded-2xl rounded-xl overflow-hidden relative shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={category?.image}
                alt={category?.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />
              <h3 className="absolute bottom-0 left-0 right-0 text-white md:text-lg text-sm md:text-xl font-semibold text-center py-3 bg-primary-c bg-opacity-70">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
