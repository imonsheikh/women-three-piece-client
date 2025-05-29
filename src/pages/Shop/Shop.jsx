import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

const productsData = [
  { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59 },
  { id: 2, name: "Cotton T-Shirt", category: "Clothing", price: 19 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 79 },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 199 },
  { id: 5, name: "Denim Jacket", category: "Clothing", price: 89 },
  { id: 6, name: "Leather Wallet", category: "Accessories", price: 39 },
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const fullText = "Search products...";
  const [cursorVisible, setCursorVisible] = useState(true);

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

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  const displayPlaceholder = animatedPlaceholder + (cursorVisible ? "|" : " ");

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredProducts = productsData
    .filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || product.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

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
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: Categories */}
        <div className="md:w-1/5 w-full">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Categories</h2>

          {/* Mobile View: Horizontal Scrollable Buttons */}
          <div className="flex md:hidden overflow-x-auto space-x-2 pb-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm border whitespace-nowrap ${
                  category === item
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:shadow-sm transition`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop View: Vertical List */}
          <ul className="hidden md:block space-y-2">
            {categories.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setCategory(item)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm border ${
                    category === item
                      ? "bg-blue-500 text-white border-blue-500"
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
        <div className="md:w-4/5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard product={product}/>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
