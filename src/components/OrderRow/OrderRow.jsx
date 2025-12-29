import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF.jsx";

const OrderRow = ({ order, idx, refetch, onView, onDelete }) => {
  const axiosSecure = useAxiosSecure();
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    await axiosSecure.patch(`/orders/${order._id}`, {
      status: e.target.value,
    });
    refetch();
    setUpdating(false);
  };

  return (
    <tr className="border-t">
      <td className="p-3">{idx + 1}</td>
      <td className="p-3">{order.customer?.name}</td>
      <td className="p-3">{order.userEmail}</td>
      <td className="p-3">{order.items.length}</td>
      <td className="p-3 font-semibold"> ৳ {order.total?.toFixed(2)}</td>
      <td className="p-3 capitalize">{order.paymentMethod}</td>

      <td className="p-3">
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={updating}
          className="border rounded px-2 py-1"
        >
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(
            (s) => (
              <option key={s}>{s}</option>
            )
          )}
        </select>
      </td>

      <td className="p-3 text-sm">
        {new Date(order.date).toLocaleString()}
      </td>

      <td className="p-3 space-x-2">
        <button
          onClick={onView}
          className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
        >
          View
        </button>

        <button
          onClick={() => generateInvoicePDF(order)}
          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
        >
          Invoice
        </button>

        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
