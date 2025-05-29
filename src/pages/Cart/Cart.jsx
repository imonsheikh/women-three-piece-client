import { useState } from "react";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2/src/sweetalert2.js";
import useAuth from "../../hooks/useAuth.jsx";

const Cart = () => {
  const { user } = useAuth();
  const [carts, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (itemId, action) => {
    setLoading(true);
    try {
      const response = await axiosSecure.patch(`/cart/${itemId}/${action}`);
      if (response.status === 200) {
        refetch();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    setLoading(true);
    try {
      await axiosSecure.delete(`/cart/${id}`);
      refetch();
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete("/cart", {
            params: { email: user.email },
          });
          if (response.data.deletedCount > 0) {
            Swal.fire("Cleared!", "Your cart has been cleared.", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error clearing cart:", error);
          Swal.fire("Error!", "Failed to clear the cart.", "error");
        }
      }
    });
  };

  const total = carts.reduce(
    (sum, item) => sum + (item.totalPrice || item.productPrice * item.quantity),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

        {carts.length === 0 ? (
          <p className="text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {carts.map((item, index) => (
                <li
                  key={item._id}
                  className="py-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-6 text-gray-500 font-medium">
                      {index + 1}.
                    </div>
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Unit Price: BDT {item.productPrice}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, "decrease")}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          disabled={loading || item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="mx-3 text-base font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, "increase")}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          disabled={loading}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end justify-between h-full gap-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-400 transition"
                      title="Remove from cart"
                    >
                      <FaTrash size={18} />
                    </button>
                    <p className="text-gray-700 font-semibold">
                      BDT {(item.totalPrice || item.productPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
              <h4 className="text-xl font-bold text-gray-800">
                Total: BDT {total.toFixed(2)}
              </h4>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={clearCart}
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-lg"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 
                             text-white text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 
                             ring-2 ring-blue-300 hover:ring-blue-500 transition duration-300 flex items-center gap-2"
                >
                  🧾 Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
