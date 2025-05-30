import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
import Container from "../../../components/Container/Container";
import Title from "../../../components/Title";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

  const pieData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Products", value: stats.totalProducts },
    { name: "Orders", value: stats.totalOrders },
  ];

  const barData = [
    {
      name: "Stats",
      Users: stats.totalUsers,
      Products: stats.totalProducts,
      Orders: stats.totalOrders,
    },
  ];

  const COLORS = ["#6366F1", "#10B981", "#EC4899"];

  return (
    <Container>
      <div className="min-h-screen p-5 bg-gray-50">
        <Title>Admin Dashboard</Title>

        {/* Welcome Section */}
        <div className="bg-white p-5 rounded-md shadow mt-4">
          <h2 className="text-xl font-semibold mb-1">
            Welcome, {user?.displayName || "Admin"}!
          </h2>
          <p className="text-sm text-gray-500">
            Manage your platform efficiently. Keep an eye on the stats below.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase font-medium">Total Users</h3>
                <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase font-medium">Total Products</h3>
                <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
              </div>
              <FaBoxOpen className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase font-medium">Total Orders</h3>
                <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <FaShoppingCart className="text-4xl opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-center">Overview Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-center">Bar Chart Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#6366F1" />
                <Bar dataKey="Products" fill="#10B981" />
                <Bar dataKey="Orders" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminHome;
