import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import useCart from "../../hooks/useCart.jsx";
import useAddToCart from "../../hooks/useAddToCart.jsx";
import useUpdateQuantity from "../../hooks/useUpdateQuantity.jsx";

const ProductCard = ({ product }) => {
  const { productName, productPrice, discountPercentage, images, _id } = product;
  const originalPrice = productPrice / (1 - discountPercentage / 100);
  const { user } = useAuth();
  const [carts, refetch] = useCart();
  const { addToCart } = useAddToCart();
  const updateQuantity = useUpdateQuantity();

  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(productPrice);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    if (result.success || result.alreadyInCart) {
      setInCart(true);
      refetch();
    }
  };

  const increaseQty = async () => {
    if (!cartItemId) return;
    const res = await updateQuantity(cartItemId, "increase");
    if (res.status === 200) {
      setQuantity((prev) => prev + 1);
      setTotalPrice((prev) => prev + productPrice);
      refetch();
    }
  };

  const decreaseQty = async () => {
    if (quantity <= 1 || !cartItemId) return;
    const res = await updateQuantity(cartItemId, "decrease");
    if (res.status === 200) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - productPrice);
      refetch();
    }
  };

  useEffect(() => {
    if (carts && _id) {
      const found = carts.find((item) => item.productId === _id);
      if (found) {
        setInCart(true);
        setQuantity(found.quantity);
        setCartItemId(found._id);
        setTotalPrice(found.totalPrice);
      } else {
        setInCart(false);
        setCartItemId(null);
        setQuantity(1);
        setTotalPrice(productPrice);
      }
    }
  }, [carts, _id, productPrice]);

  return (
    <div className="flex flex-col justify-between max-w-sm w-full min-h-[420px] rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition duration-300 relative">
      <span className="absolute bg-red-300 rounded-full px-4 py-1 text-sm text-green-600 top-1 right-1">
        Save {discountPercentage}%
      </span>

      <div
        className="relative w-full h-60 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link to={`/product-details/${_id}`} className="block w-full h-full">
          {/* First Image */}
          <img
            src={images[0]}
            alt={productName}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Second Image on Hover */}
          {images[1] && (
            <img
              src={images[1]}
              alt={`${productName} hover`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">{productName}</h3>

        <div className="mb-3 flex items-center space-x-2">
          <p className="text-sm md:text-lg font-bold text-blue-600">BDT {totalPrice.toFixed(2)}</p>
          <p className="text-xs md:text-sm line-through text-gray-400">
            BDT {(originalPrice * quantity).toFixed(2)}
          </p>
        </div>

        {inCart && (
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={decreaseQty}
              className="w-7 h-7 md:w-8 md:h-8 border rounded-full text-base font-semibold text-gray-700 hover:bg-gray-200"
            >
              −
            </button>
            <span className="text-sm md:text-lg font-medium">{quantity}</span>
            <button
              onClick={increaseQty}
              className="w-7 h-7 md:w-8 md:h-8 border rounded-full text-base font-semibold text-gray-700 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        )}

        {!inCart ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
          >
            Add to Cart
          </button>
        ) : (
          <Link
            to="/cart"
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition text-center block text-sm md:text-base"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
