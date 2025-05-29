// components/ProductActions.jsx
import { useEffect, useState } from "react";
import useAddToCart from "../../hooks/useAddToCart";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart.jsx";

const ProductActions = ({ product }) => { 
    console.log(product);
    
  const { productPrice, discountPercentage, productName } = product;
  const { user } = useAuth();
  const [carts] = useCart();
  const { addToCart } = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const totalPrice = productPrice * quantity;
  const originalPrice = productPrice / (1 - discountPercentage / 100);

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    if (result.success || result.alreadyInCart) {
      setInCart(true);
    }
  };

  useEffect(() => {
    if (carts && product?._id) {
      const found = carts.find(
        (item) =>
          item._id === product._id || item.productName === product.productName
      );
      if (found) {
        setInCart(true);
      }
    }
  }, [carts, product]);

  return (
    <div className="mt-4">
      <span className="inline-block bg-red-300 rounded-full px-4 py-1 text-sm text-green-600">
        Save{" "}
        {originalPrice > 0
          ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
          : 0}
        %
      </span>

      <div className="mt-2 mb-3 flex items-center space-x-2">
        <p className="text-lg font-bold text-blue-600">
          BDT {totalPrice.toFixed(2)}
        </p>
        <p className="text-sm line-through text-gray-400">
          ${(originalPrice * quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={decreaseQty}
          className="w-8 h-8 border rounded-full text-lg font-semibold text-gray-700 hover:bg-gray-200"
        >
          −
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={increaseQty}
          className="w-8 h-8 border rounded-full text-lg font-semibold text-gray-700 hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {!inCart ? (
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      ) : (
        <Link
          to="/cart"
          className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          View Cart
        </Link>
      )}
    </div>
  );
};

export default ProductActions;
