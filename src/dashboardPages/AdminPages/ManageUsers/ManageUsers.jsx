import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import toast from "react-hot-toast";
import Container from "../../../components/Container/Container.jsx";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load users
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  return (
   <Container>
     <div className="min-h-screen bg-white p-4">
      <Title>Manage Users</Title>

      <div className="text-lg font-medium text-gray-700 mb-4">
        Total Users: {users.length}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm ">
            <thead className="bg-gray-100 text-center">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border">{user.name || "N/A"}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border capitalize">
                    {user.role === "admin" ? (
                      <span className="text-white bg-green-600 px-2 py-1 rounded text-xs font-semibold">
                        Admin
                      </span>
                    ) : (
                      <span className="text-gray-700">User</span>
                    )}
                  </td>

                  <td className="p-2 border">
                    {user.isBlocked ? (
                      <span className="text-red-500 font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
   </Container>
  );
};

export default ManageUsers;
