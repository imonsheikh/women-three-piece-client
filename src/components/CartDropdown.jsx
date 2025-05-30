import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const CartDropdown = ({ carts }) => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null); // Reference to the dropdown container

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  return (
    <div className="relative" ref={cartRef}>
      {/* Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        aria-label="Shopping cart"
        className="relative w-11 h-11 rounded-full flex items-center justify-center border border-gray-300 hover:bg-indigo-50 transition duration-200"
      >
        <FiShoppingCart className="text-2xl text-gray-700" />
        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
          {carts.length}
        </span>
      </button>

      {/* Dropdown Content */}
      {showCart && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-4 z-50">
          {/* Close Button */}
          <button
            onClick={() => setShowCart(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            aria-label="Close cart"
          >
            <IoMdClose size={24} />
          </button>

          <div className="pt-6">
            <span className="font-semibold text-lg text-gray-900">
              {carts.length} Items
            </span>
            <Link
              to="/cart"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
