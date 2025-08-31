import { useEffect, useState } from "react";
import OrderRow from "../../../components/OrderRow/OrderRow.jsx";
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import Loading from "../../../components/Loading/Loading.jsx";
import Container from "../../../components/Container/Container.jsx";

const ORDERS_PER_PAGE = 10;

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/all-orders");

      // Sort by date DESC (latest first)
      const sortedOrders = (res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
      <div className="">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h2>

      {loading ? (
       <Loading/>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl shadow text-left">
              <thead className="bg-primary-c text-white/90 text-sm uppercase">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {paginatedOrders.map((order, idx) => (
                  <OrderRow
                    key={order._id}
                    order={order}
                    idx={(currentPage - 1) * ORDERS_PER_PAGE + idx}
                    refetch={fetchOrders}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === page + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageOrders;
