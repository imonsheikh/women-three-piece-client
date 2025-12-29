import { useEffect, useState } from "react";
import OrderRow from "../../../components/OrderRow/OrderRow.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import Swal from "sweetalert2";

const ORDERS_PER_PAGE = 10;

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/all-orders");
      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sorted);
      setFilteredOrders(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //  Search by name or email
  useEffect(() => {
    const result = orders.filter(
      (order) =>
        order.customer?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.userEmail?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(result);
    setCurrentPage(1);
  }, [search, orders]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  //  Delete order
  const handleDeleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "Delete order?",
      text: "This cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/orders/${id}`);
        Swal.fire("Deleted!", "Order deleted", "success");
        fetchOrders();
      } catch {
        Swal.fire("Error", "Failed to delete order", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">All Orders</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="border px-3 py-2 mb-4 w-full md:w-80 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border rounded shadow">
              <thead className="bg-primary-c text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order, idx) => (
                  <OrderRow
                    key={order._id}
                    order={order}
                    idx={(currentPage - 1) * ORDERS_PER_PAGE + idx}
                    refetch={fetchOrders}
                    onView={() => setSelectedOrder(order)}
                    onDelete={() => handleDeleteOrder(order._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === n + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {n + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Order Details Modal */}
{selectedOrder && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Order Details
          </h3>
          <p className="text-sm text-gray-500">
            Invoice: {selectedOrder.invoiceNo}
          </p>
        </div>

        <button
          onClick={() => setSelectedOrder(null)}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">

        {/* Customer & Order Info */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Customer Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-700">
              Customer Information
            </h4>
            <p><b>Name:</b> {selectedOrder.customer?.name}</p>
            <p><b>Email:</b> {selectedOrder.userEmail}</p>
            <p><b>Phone:</b> {selectedOrder.customer?.phone}</p>
            <p><b>Address:</b> {selectedOrder.customer?.address}</p>
          </div>

          {/* Order Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-700">
              Order Information
            </h4>
            <p>
              <b>Status:</b>{" "}
              <span className="capitalize px-2 py-1 rounded text-sm bg-blue-100 text-blue-700">
                {selectedOrder.status}
              </span>
            </p>
            <p><b>Payment:</b> {selectedOrder.paymentMethod}</p>
            <p><b>Shipping:</b> {selectedOrder.shippingMethod}</p>
            <p>
              <b>Date:</b>{" "}
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">
            Ordered Items
          </h4>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        {item.brandName}
                      </p>
                    </td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">
                      ৳ {item.productPrice}
                    </td>
                    <td className="p-3 text-right font-medium">
                      ৳ {item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 border rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {selectedOrder.total - selectedOrder.shippingCost}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳ {selectedOrder.shippingCost}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>৳ {selectedOrder.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-end">
        <button
          onClick={() => setSelectedOrder(null)}
          className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default ManageOrders;
