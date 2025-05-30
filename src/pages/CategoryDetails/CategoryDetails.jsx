import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts.jsx";
import ProductCard from "./../../components/ProductCard/ProductCard";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  // console.log(categoryName);
  const [products = []] = useProducts();
  // console.log(products);
  const categoryProducts = products.filter(
    (product) => product.category === categoryName
  );
  // console.log(categoryProducts);

  return (
    <div className="mt-5">
      <div>
        <div className="breadcrumbs text-sm font-bold">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>{categoryName}</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {categoryProducts.map((categoryProduct) => (
          <ProductCard
            key={categoryProduct._id}
            product={categoryProduct}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
