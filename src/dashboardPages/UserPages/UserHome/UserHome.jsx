import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import {
  FiShoppingCart,
  FiHeart,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useCart from "../../../hooks/useCart.jsx";

const UserHome = () => {
  const { user } = useAuth();  
    const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [carts] = useCart()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get(`/orders?email=${user.email}`);
        setOrders(response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchOrders();
  }, [user?.email, axiosSecure]);


  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      {/* ================= Welcome Section ================= */}
      <header className="mb-8">
        <h1 className="md:text-3xl text-lg font-bold text-gray-800">
          Welcome back, {user?.displayName || "User"} 
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Manage your profile, track orders, and discover new products.
        </p>
      </header>

      {/* ================= Profile Overview ================= */}
      <section className="max-w-5xl mx-auto bg-white border rounded-2xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Your Profile
        </h2>

        <div className="flex items-center gap-6 mb-8">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border shadow-sm"
          />
          <div className="text-gray-700 text-base space-y-1">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {user?.displayName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {user?.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition">
            <FiPackage className="w-6 h-6 text-blue-500 mb-2" />
            <p className="font-semibold text-gray-800">{orders?.length}</p>
            <span className="text-sm text-gray-500">Orders</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition">
            <FiHeart className="w-6 h-6 text-pink-500 mb-2" />
            <p className="font-semibold text-gray-800">0</p>
            <span className="text-sm text-gray-500">Wishlist</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition">
            <FiShoppingCart className="w-6 h-6 text-green-500 mb-2" />
            <p className="font-semibold text-gray-800">{carts.length}</p>
            <span className="text-sm text-gray-500">Cart</span>
          </div>
        </div>
      </section>

      {/* ================= Quick Actions ================= */}
      <section className="max-w-5xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/products">
            <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-6 bg-white text-center group">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Browse Products
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Discover trending items now
              </p>
              <FiArrowRight className="mx-auto text-gray-400 group-hover:text-gray-600 transition" />
            </div>
          </Link>

          <Link to="/dashboard/my-orders">
            <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-6 bg-white text-center group">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                My Orders
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Track your recent purchases
              </p>
              <FiArrowRight className="mx-auto text-gray-400 group-hover:text-gray-600 transition" />
            </div>
          </Link>

          <Link to="/wishlist">
            <div className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-6 bg-white text-center group">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Wishlist
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                See items you saved for later
              </p>
              <FiArrowRight className="mx-auto text-gray-400 group-hover:text-gray-600 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* ================= Recent Orders ================= */}
{/* ================= Recent Orders ================= */}
<section className="max-w-5xl mx-auto bg-white border rounded-2xl shadow-sm p-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">
    Recent Orders
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 text-sm text-gray-600">
          <th className="p-3">Invoice No</th>
          <th className="p-3">Date</th>
          <th className="p-3">Status</th>
          <th className="p-3">Payment</th>
          <th className="p-3">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id} className="border-b text-sm hover:bg-gray-50">
              <td className="p-3 text-gray-700 font-medium">
                {order?.invoiceNo || "N/A"}
              </td>
              <td className="p-3 text-gray-600">
                {new Date(order.date).toLocaleDateString("en-GB")}
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-gray-600 capitalize">
                {order.paymentMethod.replaceAll("_", " ")}
              </td>
              <td className="p-3 text-gray-800 font-semibold">
                {order.total.toFixed(2)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-3 text-gray-500" colSpan="5">
              No orders found. Start shopping to see them here!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>


    </div>
  );
};

export default UserHome;
