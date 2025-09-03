import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ProductCard from '../../../components/ProductCard/ProductCard';
import useProducts from '../../../hooks/useProducts.jsx';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const [products = []] = useProducts();

  // Filter for "new_arrivals"
  const latestProducts = products.filter(
    (product) => product?.type === "new_arrivals"
  );

  // Mobile-first: Show max 4 or 8 items
  const screenWidth = window.innerWidth;
  const maxItemsToShow = screenWidth < 768 ? 4 : 8;

  const productsToShow = latestProducts.slice(0, maxItemsToShow);
  const shouldShowViewAll = latestProducts.length > maxItemsToShow;

  return (
    <div className="md:mt-10 mt-5">
      {/* Section Title */}
      <SectionTitle heading="Latest Products" />

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
        {productsToShow.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* View All Button at Bottom */}
      {shouldShowViewAll && (
        <div className="flex justify-center mt-6">
          <Link to="/shop">
            <button className="btn md:btn-md btn-sm bg-primary-c text-white">
              View All
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
