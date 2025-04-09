import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
// import useProducts from '../../../hooks/useProducts.jsx';
import useCategories from "../../../hooks/useCategories.jsx";
import { Link } from "react-router-dom";

const ShopByCategories = () => {
  // const [products] = useProducts()
  const [categories = []] = useCategories();
  console.log(categories);

  return (
    <div>
      <SectionTitle heading={"Shop By Categories"}></SectionTitle>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
        {categories.map((category) => (
          <Link 
          key={category._id}
          to={`/${category.slug}`}>
            <div>
              <img
                className="rounded-t-2xl h-50 w-full object-cover brightness-50"
                src={category?.image}
                // src=""
                alt=""
              />
              <h1 className="font-bold text-xl bg-primary-c rounded-b-4xl text-white text-center p-1">
                {category.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
