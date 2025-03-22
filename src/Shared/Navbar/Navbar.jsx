import React from "react";
import { IoSearch } from "react-icons/io5";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import HotLine from "../../components/HotLine/HotLine.jsx";
import logo from "../../assets/logo/logo.png";
import useAuth from "../../hooks/useAuth.jsx";
import Swal from "sweetalert2/src/sweetalert2.js";
// import 'sweetalert2/src/sweetalert2.scss'
import "sweetalert2/dist/sweetalert2.min.css";
import Loading from "../../components/Loading/Loading.jsx";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  if (loading) return <Loading></Loading>;
  console.log(user);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure Want to Logout?",
      text: "You won't be able to access your personal data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You are exited.",
              icon: "success",
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const navOptions = (
    <>
      <li>
        <NavLink to="/">Woman Collection</NavLink>
      </li>
      <li>
        <NavLink to="/mens">Men's Collection</NavLink>
      </li>
      <li>
        <NavLink to="/eid-offers">Eid Offers</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
    </>
  );
  const defaultPhotoURL =
    "https://img.icons8.com/?size=100&id=85147&format=png&color=000000";

  return (
    <div className="top-0  sticky z-20">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <div className="w-12">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
          <Link to="/" className="font-medium md:text-lg text-[10px]">
            Mehrab <br /> Fashion House
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1">
            {navOptions}
        </ul>   */}
          {/* Search starts */}
          <label className="input md:w-60 w-3.5 outline-none focus-within:outline-primary-c border-[1.5px] border-primary-c">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search Products" />
          </label>
          {/* Search ends */}
        </div>

        <div className="navbar-end gap-2">
          <HotLine></HotLine>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {user ? (
              <>
                {/* <button className="btn btn-ghost">
            LogOut
          </button>  */}
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {user?.photoURL ? (
                        <img alt="User" referrerPolicy="no-referrer" src={user.photoURL} />
                      ) : (
                        <img alt="Default User" src={defaultPhotoURL} />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow right-0"
                  >
                    <li>
                      <a className="justify-between">
                        {user?.displayName || "N/A"}
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li onClick={handleLogout} className="btn btn-warning">
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary text-white">Login</button>
                </Link>
              </>
            )}

            <div className="dropdown dropdown-end "></div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center bg-accent-c font-semibold -mb-[20px]">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Navbar;
