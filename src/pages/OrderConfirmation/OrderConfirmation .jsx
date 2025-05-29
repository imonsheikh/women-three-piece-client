import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>

      <p className="text-gray-600 text-lg max-w-md mb-6">
        Thank you for your purchase. We've received your order and will process it shortly.
      </p>

      <div className="flex gap-4 flex-wrap items-center justify-center">
        <Link
          to="/dashboard/my-orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition text-lg font-semibold"
        >
          View My Orders
        </Link>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
