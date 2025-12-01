import useAdmin from "../hooks/useAdmin";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoAddCircleSharp, IoHomeSharp } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { MdCategory, MdManageAccounts } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import Loading from "../components/Loading/Loading.jsx";
import { BiSolidCategory } from "react-icons/bi";
import { GiKnightBanner, GiShop } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa"; 
import logo from "../assets/logo/original-logo.jpeg";



const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  

  if (isAdminLoading) {
    return <Loading />
  }

  const adminNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base " : "text-base"
          }
          to="/dashboard/home"
        >
          <div className="flex items-center gap-2">
            <IoHomeSharp size={25} />
            <p>Admin Home</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/add-product"
        >
          <div className="flex items-center gap-2">
            <IoAddCircleSharp size={25} />
            <p>Add Product</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/banner-add"
        >
          <div className="flex items-center gap-2">
            <GiKnightBanner size={25} />
            <p>Banner Add</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/manage-category"
        >
          <div className="flex items-center gap-2">
            <BiSolidCategory size={25} />
            <p>Manage Category</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/sub-categories"
        >
          <div className="flex items-center gap-2">
            <MdCategory size={25} />
            <p>Sub Categories</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/manage-products"
        >
          <div className="flex items-center gap-2">
            <GiShop size={25} />
            <p>Manage Products</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/manage-users"
        >
          <div className="flex items-center gap-2">
            <MdManageAccounts size={25} />
            <p>Manage User</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary-c bg-secondary-c font-bold text-base"
              : "text-base"
          }
          to="/dashboard/manage-payment"
        >
          <div className="flex items-center gap-2">
            <AiFillDollarCircle size={25} />
            <p>Manage Orders</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  const userNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/home"
        >
          <div className="flex items-center gap-2">
            <IoHomeSharp size={25} />
            <p>User Home</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary-c font-bold text-base" : "text-base"
          }
          to="/dashboard/my-orders"
        >
          <div className="flex items-center gap-2">
            <FaShoppingBag size={25} />
            <p>My Orders</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full ">
      <div className="lg:sticky sticky top-0  z-40 lg:left-0 lg:top-0 p-0 lg:px-8 bg-base-300 lg:w-[300px] w-full lg:h-screen">
        <Link to="/"> <img src={logo} className="hidden lg:block w-50 h-20" alt="Logo" /></Link>
        <div className="px-1 mt-5">
          <ul className="space-y-6 border-b-4 border-black pb-10 lg:block hidden">
            {isAdmin ? adminNav : userNav}
          </ul>
        </div>
        <div className="lg:hidden flex lg:px-4 px-2 py-3 mx-auto">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className=" flex justify-between drawer-content">  

                    {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 text-indigo-700 font-bold text-lg md:text-xl">
                          <img alt="Logo" src={logo} className="w-10 h-10 object-contain" />
                          <div className="leading-tight text-base lg:text-lg sm:block">
                            <span className="block">Noor</span>
                            <span className="text-sm font-light text-gray-600">Fashion </span>
                          </div>
                        </Link>
              
              <label htmlFor="my-drawer" className=" drawer-button ">
                <TiThMenuOutline size={25} />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul 
                onClick={() => document.getElementById("my-drawer").checked = false} 
              className="menu p-4 w-[280px] min-h-full bg-base-200 text-base-content ">
                <img className=" w-[200px] mb-4" alt="Logo" src={logo} />
                {isAdmin ? adminNav : userNav}
                {/* <li className=" py-5 border-t-4"></li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen lg:mt-10 lg:ml-10 mx-auto text-center">
        <Outlet />
      </div>
    </div> 
  );
};

export default Dashboard;
