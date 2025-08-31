import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF.jsx";

const OrderRow = ({ order, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await axiosSecure.patch(`/orders/${order._id}`, { status: newStatus });
      refetch(); // update after reload
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <tr className="border-t">
      <td className="p-4">{idx + 1}</td>
      <td className="p-4">{order.customer?.name || "N/A"}</td>
      <td className="p-4">{order.userEmail}</td>
      <td className="p-4">
        <ul className="list-disc list-inside space-y-1">
          {order.items.map((item, i) => (
            <li key={i}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </td>
      <td className="p-4 font-semibold">{order.total?.toFixed(2)}</td>
      <td className="p-4 capitalize">{order.paymentMethod}</td>
      <td className="p-4">
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={updating}
          className="px-2 py-1 rounded border text-sm"
        >
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(
            (option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            )
          )}
        </select>
      </td>
      <td className="p-4 text-sm text-gray-500">
        {new Date(order.date).toLocaleString()}
      </td>

      {/* new Action column  */}
      <td className="p-4">
        <button
          onClick={() => generateInvoicePDF(order)}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition"
        >
          Download
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
