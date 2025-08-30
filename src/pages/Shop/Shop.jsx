import React, { useState, useEffect } from "react";
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

  // Animated Placeholder
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

  // Cursor Blink
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((p) => !p), 500);
    return () => clearInterval(blink);
  }, []);
  const displayPlaceholder = animatedPlaceholder + (cursorVisible ? "|" : " ");

  // Category Map
  const categoryMap = products.reduce((acc, product) => {
    const { category, subCategory } = product;
    if (!category) return acc;
    if (!acc[category]) acc[category] = new Set();
    if (subCategory) acc[category].add(subCategory);
    return acc;
  }, {});

  const categories = ["All", ...Object.keys(categoryMap)];

  // Navigate
  const handleNavigate = (cat, sub) => {
    if (cat === "All") {
      navigate("/products");
    } else if (sub) {
      navigate(
        `/shop/category/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}`
      );
    } else {
      navigate(`/shop/category/${encodeURIComponent(cat)}`);
    }
  };

  // Filter Products
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

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, name, sortOrder]);

  return (
    <div className="mx-auto py-4 mt-4">
    {/* Horizontal Categories Menu */}
<div className="flex flex-wrap justify-center gap-4 mb-8 border-b pb-3">
  {categories.map((cat) => (
    <div key={cat} className="relative group">
      <button
        onClick={() => handleNavigate(cat)}
        className={`px-5 py-2 rounded-full font-medium transition ${
          decodeURIComponent(name || "All") === cat
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        }`}
      >
        {cat}
      </button>

      {/* Subcategories Dropdown */}
      {cat !== "All" && categoryMap[cat] && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
          <ul className="py-2">
            {[...categoryMap[cat]].map((sub) => (
              <li key={sub}>
                <button
                  onClick={() => handleNavigate(cat, sub)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded"
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ))}
</div>


      {/* Top Bar */}
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
        {paginatedProducts.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-500 flex flex-col items-center space-y-4">
            <FiBox className="text-5xl text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600">
              No products found
            </h3>
            <p className="text-sm text-gray-400">
              We couldn’t find any products matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
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
                currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
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
  );
};

export default Shop;
