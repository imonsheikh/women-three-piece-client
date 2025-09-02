import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import useProducts from "../../hooks/useProducts.jsx";
import useCategories from "../../hooks/useCategories.jsx";
import useSubCategories from "../../hooks/useSubCategories.jsx";
import { FiBox } from "react-icons/fi";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.jsx";
import { BiSearch } from "react-icons/bi";

const Shop = () => {
  const [products, productsLoading] = useProducts();
  const [categories, categoriesLoading] = useCategories();
  const [subCategories, subCategoriesLoading] = useSubCategories();

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const itemsPerPage = 6;
  const fullText = "Search products...";

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

  // Memoized categoryMap
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const subs = subCategories
        .filter((sub) => sub.categoryId === cat._id)
        .map((s) => s.name);
      map[cat.name] = subs;
    });
    return map;
  }, [categories, subCategories]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  // Navigate + state update
  const handleNavigate = (cat, sub) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(sub || null);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchSearch = product.productName
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        const matchSubCategory =
          !selectedSubCategory || product.subCategory === selectedSubCategory;

        return matchSearch && matchCategory && matchSubCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") return a.productPrice - b.productPrice;
        if (sortOrder === "desc") return b.productPrice - a.productPrice;
        return 0;
      });
  }, [products, search, sortOrder, selectedCategory, selectedSubCategory]);

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
  }, [search, selectedCategory, selectedSubCategory, sortOrder]);

  if (productsLoading || categoriesLoading || subCategoriesLoading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="mx-auto py-4 mt-4 px-2 sm:px-4 lg:px-6">
  {/* Horizontal Categories Menu */}
  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-8 bg-black/10 rounded-full shadow-sm sticky top-16 z-10 px-2 py-2 sm:px-4 sm:py-2">
    {allCategories.map((cat) => (
      <div
        key={cat}
        className="relative py-1 flex justify-center items-center"
        onMouseEnter={() => setOpenDropdown(cat)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <Link
          to={cat === "All" ? "/products" : `/${encodeURIComponent(cat)}`}
        >
          <button
            onClick={() => handleNavigate(cat)}
            className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full font-medium transition text-sm sm:text-base ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:ring-1 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        </Link>

        {cat !== "All" &&
          categoryMap[cat] &&
          categoryMap[cat].length > 0 && (
            <div
              className={`absolute left-0 top-full w-40 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 z-50 ${
                openDropdown === cat
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <ul className="py-2 text-sm sm:text-base">
                {categoryMap[cat].map((sub) => (
                  <li key={sub}>
                    <Link
                      to={`/${encodeURIComponent(cat)}/${encodeURIComponent(
                        sub
                      )}`}
                    >
                      <button
                        onClick={() => {
                          handleNavigate(cat, sub);
                          setOpenDropdown(null);
                        }}
                        className={`block w-full text-left px-3 sm:px-4 py-1 sm:py-2 rounded font-semibold transition ${
                          selectedSubCategory === sub
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {sub}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    ))}
  </div>

  {/* Search + Sort */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6">
    <div className="relative w-full sm:w-1/2 border border-gray-300 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder={displayPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 placeholder-gray-400 text-gray-700 text-sm sm:text-base"
      />
      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <BiSearch />
      </span>
    </div>

    <div className="w-full sm:w-1/4 relative">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 appearance-none pr-8 text-sm sm:text-base"
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm sm:text-base">
        ▼
      </span>
    </div>
  </div>

  {/* Product Grid */}
  <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
    {paginatedProducts.length > 0 ? (
      paginatedProducts.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))
    ) : (
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
    <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-1 sm:space-x-2 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1 border rounded disabled:opacity-50 text-sm sm:text-base"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => handlePageChange(idx + 1)}
          className={`px-2 sm:px-3 py-1 border rounded text-sm sm:text-base ${
            currentPage === idx + 1
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1 border rounded disabled:opacity-50 text-sm sm:text-base"
      >
        Next
      </button>
    </div>
  )}
</div>

  );
};

export default Shop;
