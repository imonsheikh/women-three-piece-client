import React from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx";
import HotLine from "../../components/HotLine/HotLine.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import logo from "../../assets/logo/logo.png";
import useCart from "../../hooks/useCart.jsx";
import CartDropdown from "../../components/CartDropdown.jsx";
import useAdmin from "../../hooks/useAdmin.jsx";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [carts] = useCart();

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

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
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
          to="/shop"
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
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
              : "hover:text-indigo-500 transition"
          }
        >
          Categories
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md">
      <div className="container flex items-center justify-between h-16 lg:max-w-9/12 mx-auto ">

        {/* Left: Logo (desktop) or Mobile menu */}
        <div className="flex items-center lg:space-x-6 w-1/3 lg:w-auto">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-start">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-48 p-2 border border-gray-200"
              >
                {navLinks}
              </ul>
            </div>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-indigo-700 font-bold text-lg md:text-xl">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <div className="leading-tight text-base lg:text-lg sm:block">
              <span className="block">Mehrab</span>
              <span className="text-sm font-light text-gray-600">Fashion House</span>
            </div>
          </Link>
        </div>

        {/* Center: Nav Menu (desktop only) */}
        <nav className="hidden lg:flex justify-center w-1/3">
          <ul className="flex space-x-8 text-gray-700">{navLinks}</ul>
        </nav>

        {/* Right: Cart + User */}
        <div className="flex items-center justify-end space-x-4 w-1/3">
          <HotLine />
          <CartDropdown carts={carts} />

          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-indigo-500 ring-offset-2 hover:ring-indigo-600 transition"
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
              <button className="btn btn-primary px-6 py-2 font-semibold hover:bg-indigo-700 transition text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
