import useAdmin from "../hooks/useAdmin";
import { NavLink, Outlet } from "react-router-dom";
import { IoAddCircleSharp, IoHomeSharp } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { MdManageAccounts } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import Loading from "../components/Loading/Loading.jsx";

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
          to="/dashboard/manage-user"
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
            <p>Manage Payments</p>
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
            <IoHomeSharp size={25} />
            <p>My Orders</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full border">
      <div className="lg:sticky sticky top-0  z-40 lg:left-0 lg:top-0 px-8 bg-base-300 lg:w-[300px] w-full lg:h-screen">
        <img className="hidden lg:block" alt="Logo" />
        <div className="px-1 mt-5">
          <ul className="space-y-6 border-b-4 border-black pb-10 lg:block hidden">
            {isAdmin ? adminNav : userNav}
          </ul>
        </div>
        <div className="lg:hidden flex px-4 py-3  ">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className=" flex justify-between drawer-content">
              <img className=" w-[120px]" alt="Logo" />
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
              <ul className="menu p-4 w-[280px] min-h-full bg-base-200 text-base-content">
                <img className=" w-[200px] mb-4" alt="Logo" />
                {isAdmin ? adminNav : userNav}
                <li className=" py-5 border-t-4"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen mt-10 ml-10 text-center">
        <Outlet />
      </div>
    </div> 
  );
};

export default Dashboard;
