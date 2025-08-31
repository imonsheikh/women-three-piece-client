import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaExclamationTriangle,
  FaFileCsv,
  FaFilePdf,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [revenue, setRevenue] = useState({ today: 0, month: 0, lifetime: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [trend, setTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersRes,
          productsRes,
          ordersRes,
          revenueRes,
          recentOrdersRes,
          lowStockRes,
          trendRes,
          topProductsRes,
          activeUsersRes,
        ] = await Promise.all([
          axiosSecure.get("/users/count"),
          axiosSecure.get("/products/count"),
          axiosSecure.get("/orders/count"),
          axiosSecure.get("/stats/revenue"),
          axiosSecure.get("/orders/recent?limit=5"),
          axiosSecure.get("/products/low-stock?limit=5"),
          axiosSecure.get("/stats/trend?days=7"),
          axiosSecure.get("/stats/top-products?limit=5"),
          axiosSecure.get("/users/active"),
        ]);

        setStats({
          totalUsers: usersRes.data.count,
          totalProducts: productsRes.data.count,
          totalOrders: ordersRes.data.count,
        });

        setRevenue(revenueRes.data);
        setRecentOrders(recentOrdersRes.data);
        setLowStock(lowStockRes.data);
        setTrend(trendRes.data);
        setTopProducts(topProductsRes.data);
        setActiveUsers(activeUsersRes.data.count);
      } catch (err) {
        console.error("Error loading admin stats:", err);
      }
    };

    fetchData();
  }, [axiosSecure]);

  // CSV export
  const exportCSV = () => {
    const headers = ["Invoice No", "Customer", "Total", "Status"];
    const rows = recentOrders.map((o) => [o.invoiceNo, o.customer?.name, `$${o.total.toFixed(2)}`, o.status]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  // PDF export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["Invoice No", "Customer", "Total", "Status"]],
      body: recentOrders.map((o) => [o.invoiceNo, o.customer?.name, `$${o.total.toFixed(2)}`, o.status]),
    });
    doc.save("orders.pdf");
  };

  return (
    <div className="min-h-screen p-5 bg-gray-50">
      <Title>Admin Dashboard</Title>

      {/* Welcome & Active Users */}
      <div className="bg-white p-5 rounded-md shadow mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-1">Welcome, {user?.displayName || "Admin"}!</h2>
          <p className="text-sm text-gray-500">Manage your platform efficiently.</p>
        </div>
        <div className="text-right text-gray-700">
          Active Users Now: <span className="font-bold">{activeUsers}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm uppercase">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <FaUsers className="text-4xl opacity-80" />
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm uppercase">Total Products</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <FaBoxOpen className="text-4xl opacity-80" />
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg shadow-lg p-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm uppercase">Total Orders</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <FaShoppingCart className="text-4xl opacity-80" />
        </div>
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {["Today", "This Month", "Lifetime"].map((label, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="text-gray-500">{label}</h4>
            <p className="text-2xl font-bold">
              ${idx === 0 ? revenue.today.toFixed(2) : idx === 1 ? revenue.month.toFixed(2) : revenue.lifetime.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Sales Trend */}
      <div className="bg-white mt-8 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Sales Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" />
            <Line type="monotone" dataKey="orders" stroke="#6366F1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders + Low Stock + Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <div className="flex space-x-2">
              <button onClick={exportCSV} className="bg-green-500 text-white px-3 py-1 rounded flex items-center">
                <FaFileCsv className="mr-1" /> CSV
              </button>
              <button onClick={exportPDF} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                <FaFilePdf className="mr-1" /> PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td>{order.invoiceNo}</td>
                    <td>{order.customer?.name || "N/A"}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td className="capitalize">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            Low Stock Alerts
          </h3>
          <ul className="space-y-2">
            {lowStock.length === 0 ? (
              <p className="text-gray-500">No low stock products.</p>
            ) : (
              lowStock.map((p) => (
                <li key={p._id} className="flex justify-between text-sm">
                  <span>{p?.productName}</span>
                  <span className="font-bold">{p.stock} left</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white mt-8 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
        <ul className="space-y-2">
          {topProducts.map((p) => (
            <li key={p._id} className="flex justify-between text-sm">
              <span>{p.productName}</span>
              <span className="font-bold">{p.salesCount} sold</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
