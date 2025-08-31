import { useState } from "react";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Checkout = () => {
  const { user } = useAuth();
  const [carts, refetch] = useCart();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // error state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const total = carts.reduce(
    (sum, item) => sum + (item.totalPrice || item.productPrice * item.quantity),
    0
  );

  const handlePlaceOrder = async () => {
    setErrorMsg(""); // clear any previous error

    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg(" Please fill out all billing details.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customer: formData,
        items: carts,
        total,
        paymentMethod,
        status: "pending",
        userEmail: user?.email,
        // date: new Date(),
      };

      const res = await axiosSecure.post("/order", orderData);

      if (res.data.insertedId) { 
        const fullOrder = { ...orderData, invoiceNo: res.data.invoiceNo, date: new Date() };
        setSuccess(true);
        await refetch();
        setTimeout(() => navigate("/order-confirmation", { state: { order: fullOrder } }), 1500);
      } else {
        setErrorMsg(" Order failed. Please try again.");
      }
    } catch (err) {
      console.error("Order error:", err);
      setErrorMsg(" Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10">
      {/* Billing Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Billing Details</h2>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-3 rounded mb-4 text-sm font-medium">
            {errorMsg}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            onChange={handleChange}
            value={user?.displayName || formData.name}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            onChange={handleChange}
            value={formData.phone}
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            rows="4"
            onChange={handleChange}
            value={formData.address}
          />

          <div className="pt-2">
            <p className="font-semibold text-gray-700 mb-2">Payment Method</p>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-600">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>

        {success && (
          <p className="text-green-600 mt-4 text-center font-semibold">
            ✅ Order placed successfully!
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
        {carts.length === 0 ? (
          <p className="text-gray-500">No items in your cart.</p>
        ) : (
          <ul className="space-y-3">
            {carts.map((item) => (
              <li key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × BDT {item.productPrice.toFixed(2)}
                  </p>
                </div>
                <p className="text-gray-800 font-medium">
                  BDT {(item.totalPrice || item.productPrice * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total:</span>
          <span>BDT {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
