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
  const [shippingMethod, setShippingMethod] = useState("inside_dhaka"); // NEW shipping option

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  // Shipping price based on user choice
  const shipping = shippingMethod === "inside_dhaka" ? 80 : 150;

  const finalTotal = total + shipping - discount;

  // Coupon Function
  const applyCoupon = () => {
    const code = coupon.toUpperCase();

    if (code === "SAVE10") {
      setDiscount(total * 0.1);
      setCouponMsg("10% discount applied!");
    } else if (code === "SAVE15") {
      setDiscount(total * 0.15);
      setCouponMsg("15% discount applied!");
    } else if (code === "SAVE20") {
      setDiscount(total * 0.2);
      setCouponMsg("20% discount applied!");
    } else {
      setDiscount(0);
      setCouponMsg("Invalid coupon code.");
    }
  };

  const handlePlaceOrder = async () => {
    setErrorMsg("");

    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg(" Please fill out all billing details.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customer: formData,
        items: carts,
        total: finalTotal,
        paymentMethod,
        shippingMethod,
        shippingCost: shipping,
        discount,
        status: "pending",
        userEmail: user?.email,
      };

      const res = await axiosSecure.post("/order", orderData);

      if (res.data.insertedId) {
        const fullOrder = {
          ...orderData,
          invoiceNo: res.data.invoiceNo,
          date: new Date(),
        };
        setSuccess(true);
        await refetch();
        setTimeout(
          () =>
            navigate("/order-confirmation", { state: { order: fullOrder } }),
          1500
        );
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
    <div className=" mx-auto md:py-10 py-5 md:px-4 px-2 grid md:grid-cols-2 md:gap-10 gap-2">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl shadow md:p-6 p-2">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>

        {carts.length === 0 ? (
          <p className="text-gray-500">No items in your cart.</p>
        ) : (
          <ul className="space-y-4">
            {carts.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <img
                  // src={item.productImage}
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />

                <div className="flex-1 ml-4">
                  <p className="font-semibold text-gray-700">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × BDT {item.productPrice.toFixed(2)}
                  </p>
                </div>

                <p className="text-gray-800 font-medium">
                  BDT{" "}
                  {(
                    item.totalPrice || item.productPrice * item.quantity
                  ).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Subtotal */}
        <div className="flex justify-between mt-5 text-gray-700">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-semibold">BDT {total.toFixed(2)}</span>
        </div> 

                  {/* Shipping Method Radio Buttons */}
          <div className="pt-4">
            <p className="font-semibold text-gray-700 mb-2">Shipping Method</p>

            <label className="flex items-center space-x-2 mb-1">
              <input
                type="radio"
                name="shippingMethod"
                value="inside_dhaka"
                checked={shippingMethod === "inside_dhaka"}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-600">ঢাকার ভিতরে — ৳ 80.00</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="shippingMethod"
                value="outside_dhaka"
                checked={shippingMethod === "outside_dhaka"}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-600">ঢাকার বাইরে — ৳ 150.00</span>
            </label>
          </div>

        {/* Shipping */}
        <div className="flex justify-between mt-2 text-gray-700">
          <span className="font-semibold">Shipping:</span>
          <span className="font-semibold">BDT {shipping.toFixed(2)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between mt-2 text-green-600">
            <span className="font-semibold">Discount:</span>
            <span>- BDT {discount.toFixed(2)}</span>
          </div>
        )}

        {/* Coupon */}
        <div className="mt-4">
          <p className="font-semibold mb-1">Apply Coupon</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="px-4 bg-green-600 text-white rounded-lg"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className="text-sm mt-1 font-medium text-blue-600">
              {couponMsg}
            </p>
          )}
        </div>

        <hr className="my-4" />

        {/* Final Total */}
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total:</span>
          <span>BDT {finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Billing Details */}
      <div className="bg-white rounded-xl shadow md:p-6 p-1 md:sticky self-start top-14">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Billing Details
        </h2>

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

          {/* Payment Method */}
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
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 group"
        >
          {loading ? "Placing Order..." : "Confirm Order"}

          {!loading && (
            <span className="transform transition-all duration-300 group-hover:translate-x-2">
              ➜
            </span>
          )}
        </button>

        {success && (
          <p className="text-green-600 mt-4 text-center font-semibold">
            Order placed successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
