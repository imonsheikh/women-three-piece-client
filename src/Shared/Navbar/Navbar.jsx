import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import useAuth from "../../hooks/useAuth.jsx";
import HotLine from "../../components/HotLine/HotLine.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import logo from "../../assets/logo/logo.png";
import useCart from "../../hooks/useCart.jsx";
import useAdmin from "../../hooks/useAdmin.jsx";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [carts] = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <Loading />;

  const defaultPhotoURL =
    "https://img.icons8.com/?size=100&id=85147&format=png&color=000000";

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to login again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged out!", "You have been logged out.", "success");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
              : "hover:text-indigo-500 transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
              : "hover:text-indigo-500 transition"
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
              : "hover:text-indigo-500 transition"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
              : "hover:text-indigo-500 transition"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md ">
      <div className="container flex items-center justify-between h-16 xl:max-w-9/12 w-full mx-auto">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center md:space-x-3">
          {/* Mobile Menu (only on mobile) */}
          <div className="lg:hidden ">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-indigo-700 font-bold text-lg md:text-xl"
          >
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <div className="leading-tight w-40 text-sm lg:text-lg sm:block">
              <span className="block">Noor</span>
              <span className="text-xs font-light text-gray-600">
                Fashion 
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex justify-center flex-1">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            {navLinks}
          </ul>
        </nav>
        <div className="w-full md:w-20 text-end font-bold md:pr-4 ">
          {/* Search Icon */}
          <button
            onClick={() => {
              navigate("/products", { state: { focusSearch: true } });
            }}
            className="btn btn-ghost btn-circle hover:bg-indigo-100"
            title="Search"
          >
            <BiSearch className="md:w-7 md:h-7 w-5 h-5 font-bold text-gray-800" />
          </button>
        </div>

        {/* Right: Hotline + Cart + User */}
        <div className="flex items-center md:space-x-4 space-x-2">
          <HotLine />

          {/* Cart Direct */}
          <button
            onClick={handleCartClick}
            className="relative btn btn-ghost btn-circle hover:bg-indigo-100"
          >
            <FiShoppingCart className="md:w-6 md:h-6 w-5 h-5" />
            {carts?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                {carts.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar md:ring-2 ring-1 ring-indigo-500 ring-offset-2 hover:ring-indigo-600 transition"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.photoURL || defaultPhotoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
              <ul className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg z-50 mt-3 w-56 border border-gray-200 overflow-y-auto h-40 p-5 space-y-4 text-center flex flex-col justify-between">
                <li>
                  <Link
                    to="/dashboard/home"
                    className="block px-4 py-3 text-gray-900 hover:bg-indigo-100 hover:text-indigo-700 transition font-semibold rounded-md text-base"
                  >
                    {isAdmin ? "Dashboard" : "My Profile"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 bg-red-900 text-white rounded-md hover:bg-red-800 transition font-semibold text-base"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary md:btn-md btn-sm text-sm md:px-6 md:py-2 px-2 py-0 md:font-semibold font-normal hover:bg-indigo-700 transition text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 p-6 lg:hidden"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl"
            >
              <RxCross2 />
            </button>
            <ul className="space-y-4 text-lg font-medium text-gray-700">
              {navLinks}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
