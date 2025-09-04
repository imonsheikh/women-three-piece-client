import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { format } from "date-fns";
import Container from "../../../components/Container/Container.jsx";

const steps = ["pending", "processing", "shipped", "delivered"];

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get(`/orders?email=${user.email}`);
        setOrders(response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchOrders();
  }, [user?.email, axiosSecure]);

  const getStepIndex = (status) => {
    const index = steps.indexOf(status?.toLowerCase());
    return index === -1 ? 0 : index;
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800"> My Orders</h2>

        {loading ? (
          <div className="text-gray-500 text-center text-lg">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500 text-center text-lg">You haven't placed any orders yet.</div>
        ) : (
          <div className="space-y-10">
            {orders.map((order, idx) => {
              const currentStep = getStepIndex(order.status);

              return (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-2xl shadow border"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                       Order #{idx + 1}
                    </h4>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Date: {format(new Date(order.date), "PPPp")}</p>
                    <p>Payment: {order.paymentMethod?.replace("_", " ") || "N/A"}</p>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                          <th className="p-3 border-b">Product</th>
                          <th className="p-3 border-b">Quantity</th>
                          <th className="p-3 border-b">Unit Price (BDT)</th>
                          <th className="p-3 border-b">Total (BDT)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={item._id} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{item.productName}</td>
                            <td className="p-3 border-b">{item.quantity}</td>
                            <td className="p-3 border-b">{item.productPrice}</td>
                            <td className="p-3 border-b">{item.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total */}
                  <div className="text-right font-semibold text-gray-800 mb-6">
                    Total Amount: BDT {(order.total || 0).toFixed(2)}
                  </div>

                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between w-full mt-4">
                    {steps.map((step, i) => (
                      <div key={step} className="flex-1 relative text-center">
                        <div
                          className={`w-5 h-5 mx-auto rounded-full ${
                            i <= currentStep ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="text-xs text-gray-700 mt-2 capitalize">{step}</div>
                        {i < steps.length - 1 && (
                          <div
                            className={`absolute top-2 left-1/2 w-full h-0.5 ${
                              i < currentStep ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            style={{ transform: "translateX(50%)", width: "100%" }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};

export default MyOrders;
