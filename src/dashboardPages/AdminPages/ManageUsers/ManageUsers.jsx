import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import toast from "react-hot-toast";
import Container from "../../../components/Container/Container.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const USERS_PER_PAGE = 15;

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Load users
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // Search users
  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  // Delete user
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then(() => {
            toast.success("User deleted");
            setUsers((prev) => prev.filter((u) => u._id !== id));
          })
          .catch(() => toast.error("Failed to delete user"));
      }
    });
  };

  // Block / Unblock
  const handleToggleBlock = (user) => {
    const action = user.isBlocked ? "Unblock" : "Block";

    Swal.fire({
      title: `${action} User?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/block/${user._id}`, { isBlocked: !user.isBlocked })
          .then(() => {
            toast.success(`User ${action}ed`);
            setUsers((prev) =>
              prev.map((u) =>
                u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
              )
            );
          })
          .catch(() => toast.error("Action failed"));
      }
    });
  };

  // Open orders modal
  const handleOpenOrders = async (email) => {
    setSelectedUserEmail(email);
    setModalOpen(true);
    setOrdersLoading(true);
    try {
      const res = await axiosSecure.get("/orders", { params: { email } });
      const sortedOrders = (res.data || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sortedOrders);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-screen bg-white p-4">
        <Title>Manage Users</Title>

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <p className="text-lg font-medium text-gray-700">
            Total Users: {filteredUsers.length}
          </p>
          <input
            type="text"
            placeholder="Search by name or email"
            className="border px-3 py-2 rounded-md w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Users Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : paginatedUsers.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-center">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Last Login</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">
                      {startIndex + idx + 1}
                    </td>
                    <td className="p-2 border">{user.name || "N/A"}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border text-center">
                      {user.role === "admin" ? (
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Admin
                        </span>
                      ) : (
                        <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                          User
                        </span>
                      )}
                    </td>
                    <td className="p-2 border text-center">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="p-2 border text-center">
                      {user.isBlocked ? (
                        <span className="text-red-600 font-semibold">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => handleOpenOrders(user.email)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => handleToggleBlock(user)}
                        className={`px-2 py-1 rounded text-white text-xs ${
                          user.isBlocked ? "bg-green-600" : "bg-yellow-500"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === num + 1 ? "bg-indigo-600 text-white" : ""
                }`}
              >
                {num + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Orders Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-3/4 max-h-[80vh] overflow-y-auto p-4 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-red-700 text-lg bg-red-300 font-bold rounded-full w-10 h-10"
              >
                X
              </button>
              <h2 className="text-xl font-bold mb-4">
                Orders for {selectedUserEmail}
              </h2>

              {ordersLoading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100 text-center">
                      <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Items</th>
                        <th className="p-2 border">Total</th>
                        <th className="p-2 border">Payment</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, idx) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="p-2 border text-center">{idx + 1}</td>
                          <td className="p-2 border">
                            {order.items.map((item) => (
                              <div key={item._id}>
                                {item.productName} x {item.quantity}
                              </div>
                            ))}
                          </td>
                          <td className="p-2 border">{order.total}</td>
                          <td className="p-2 border">{order.paymentMethod}</td>
                          <td className="p-2 border">{order.status}</td>
                          <td className="p-2 border">
                            {new Date(order.date).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageUsers;
