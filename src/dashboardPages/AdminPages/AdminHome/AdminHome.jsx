import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";
import Container from "../../../components/Container/Container";
import Title from "../../../components/Title";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axiosSecure.get("/users/count"),
          axiosSecure.get("/products/count"),
          axiosSecure.get("/orders/count"),
        ]);

        setStats({
          totalUsers: usersRes.data.count,
          totalProducts: productsRes.data.count,
          totalOrders: ordersRes.data.count,
        });
      } catch (err) {
        console.error("Error loading admin stats:", err);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <Container>
      <div className="min-h-screen p-5 bg-gray-50">
        <Title>Admin Dashboard</Title>

        <div className="bg-white p-5 rounded-md shadow mt-4">
          <h2 className="text-xl font-semibold mb-1">
            Welcome, {user?.displayName || "Admin"}!
          </h2>
          <p className="text-sm text-gray-500">
            Manage your platform efficiently. Keep an eye on the stats below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Users */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-wide font-medium">
                  Total Users
                </h3>
                <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-4xl opacity-80" />
            </div>
          </div>

          {/* Products */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-wide font-medium">
                  Total Products
                </h3>
                <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
              </div>
              <FaBoxOpen className="text-4xl opacity-80" />
            </div>
          </div>

          {/* Orders */}
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-wide font-medium">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <FaShoppingCart className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminHome;
