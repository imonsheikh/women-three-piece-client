import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import useCart from "../../hooks/useCart.jsx";
import useAddToCart from "../../hooks/useAddToCart.jsx";
import useUpdateQuantity from "../../hooks/useUpdateQuantity.jsx";

const ProductCard = ({ product }) => {
  const { productName, productPrice, discountPercentage, images, _id, stock } = product;
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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return;
    if (stock === 0) return; // cannot add out of stock
    setIsAdding(true);

    // limit quantity to stock
    const finalQuantity = quantity > stock ? stock : quantity;

    const result = await addToCart(product, finalQuantity);
    if (result.success || result.alreadyInCart) {
      setInCart(true);
      await refetch();
    }
    setIsAdding(false);
  };

  const increaseQty = async () => {
    if (!cartItemId || quantity >= stock) return; // cannot exceed stock
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + productPrice);
    await updateQuantity(cartItemId, "increase");
    await refetch();
  };

  const decreaseQty = async () => {
    if (quantity <= 1 || !cartItemId) return;
    setQuantity((prev) => prev - 1);
    setTotalPrice((prev) => prev - productPrice);
    await updateQuantity(cartItemId, "decrease");
    await refetch();
  };

  useEffect(() => {
    if (Array.isArray(carts) && carts.length && _id) {
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
    <div className="flex flex-col justify-between w-full min-h-[420px] md:rounded-2xl rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition duration-300 relative">
      {stock > 0 && (
        <span className="absolute bg-[#f6c600] rounded-full px-4 py-1 text-sm text-red-800 top-1 right-1 z-20 border">
          Save {discountPercentage}%
        </span>
      )}

      <div
        className="relative w-full h-60 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link to={`/product-details/${_id}`} className="block w-full h-full">
          <img
            src={images[0]?.url}
            alt={productName}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          />
          {images[1] && (
            <img
              src={images[1]?.url}
              alt={`${productName} hover`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1">{productName}</h3>

        <div className="mb-3 flex items-center space-x-2">
          <p className="text-sm md:text-lg font-bold text-blue-600">BDT {totalPrice.toFixed(2)}</p>
          <p className="text-xs md:text-sm line-through text-gray-400">
            BDT {(originalPrice * quantity).toFixed(2)}
          </p>
        </div>

        {stock === 0 ? (
          <div className="text-center text-red-500 font-semibold mb-4">Out of Stock</div>
        ) : inCart ? (
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
              disabled={quantity >= stock}
              className={`w-7 h-7 md:w-8 md:h-8 border rounded-full text-base font-semibold text-gray-700 hover:bg-gray-200 ${
                quantity >= stock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-primary-c text-white py-2 px-4 rounded-lg font-medium hover:bg-primary transition text-sm md:text-base"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        )}

        {inCart && (
          <Link
            to="/cart"
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition text-center block text-sm md:text-base mt-2"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
