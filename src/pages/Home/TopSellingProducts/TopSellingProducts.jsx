import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';
import useProducts from '../../../hooks/useProducts.jsx';
import { Link } from 'react-router-dom';

const TopSellingProducts = () => {
  const [products = []] = useProducts();

  // Filter products with type === "best_sellers"
  const topSelling = products.filter(
    (product) => product?.type === "best_sellers"
  );

  // Determine max items to show
  const screenWidth = window.innerWidth;
  const maxItemsToShow = screenWidth < 768 ? 4 : 8;

  const productsToShow = topSelling.slice(0, maxItemsToShow);
  const shouldShowViewAll = topSelling.length > maxItemsToShow;

  return (
    <div className="mt-10">
      {/* Section Title */}
      <SectionTitle heading="Top Selling Products" />

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-1">
        {productsToShow.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* View All Button */}
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

export default TopSellingProducts;
