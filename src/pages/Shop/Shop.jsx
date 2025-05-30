import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import useProducts from "../../hooks/useProducts.jsx";
import { FiBox } from "react-icons/fi";

const Shop = () => {
  const [products = []] = useProducts();
  const { name } = useParams();
  const navigate = useNavigate();

  const categoryFromUrl = name ? decodeURIComponent(name) : "All";

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Search products...";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Animated Placeholder Typing Effect
  useEffect(() => {
    let index = 0;
    let forward = true;

    const typingInterval = setInterval(() => {
      if (forward) {
        setAnimatedPlaceholder(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          forward = false;
          setTimeout(() => (forward = true), 2000);
          index = 0;
        }
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor Blinking Effect
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  const displayPlaceholder = animatedPlaceholder + (cursorVisible ? "|" : " ");

  // Extract categories
  const categories = [
    "All",
    ...new Set(products?.map((p) => p?.category).filter(Boolean)),
  ];

  // Handle category change
  const handleCategoryChange = (cat) => {
    if (cat === "All") {
      navigate("/shop");
    } else {
      navigate(`/shop/category/${encodeURIComponent(cat)}`);
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        categoryFromUrl === "All" || product.category === categoryFromUrl;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.productPrice - b.productPrice;
      if (sortOrder === "desc") return b.productPrice - a.productPrice;
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, name, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">All Products</h1>

      {/* Top Bar: Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder={displayPlaceholder}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded-md text-sm"
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: Categories */}
        <div className="md:w-1/5 w-full">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Categories</h2>

          {/* Mobile View */}
          <div className="flex md:hidden overflow-x-auto space-x-2 pb-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryChange(item)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm border whitespace-nowrap ${
                  decodeURIComponent(name || "All") === item
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:shadow-sm transition`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop View */}
          <ul className="hidden md:block space-y-2">
            {categories.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleCategoryChange(item)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm border ${
                    decodeURIComponent(name || "All") === item
                      ? "bg-primary-c text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:shadow-sm transition`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="md:w-4/5">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
      {paginatedProducts.length === 0 && (
  <div className="col-span-full text-center py-16 text-gray-500 flex flex-col items-center space-y-4">
    <FiBox className="text-5xl text-gray-400" />
    <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
    <p className="text-sm text-gray-400">
      We couldn’t find any products matching your search.
    </p>
  </div>
)}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
