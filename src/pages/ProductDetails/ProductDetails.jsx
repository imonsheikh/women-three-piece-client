import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useAddToCart from "../../hooks/useAddToCart";
import useProducts from "../../hooks/useProducts";

const ProductDetails = () => {
  const [products, isLoading] = useProducts();
  const { id } = useParams();
  const { user } = useAuth();
  const [carts, refetch] = useCart();
  const { addToCart } = useAddToCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const found = products.find((p) => p._id === id);
    if (found) {
      setProduct(found);
      setMainImage(found.images[0]); // default image
    }
  }, [id, products]);

  useEffect(() => {
    if (carts && product?._id) {
      const exists = carts.some((item) => item.productId === product._id);
      if (exists) setInCart(true);
    }
  }, [carts, product]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const {
    productName,
    productPrice,
    discountPercentage,
    shortDescription,
    brandName,
    images,
    _id,
  } = product;

  const originalPrice = productPrice / (1 - discountPercentage / 100);
  const totalPrice = productPrice * quantity;

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    if (result.success || result.alreadyInCart) {
      setInCart(true);
      refetch();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Section */}
      <div>
        <img src={mainImage} alt={productName} className="w-full h-[450px] object-cover rounded-2xl shadow-sm mb-4" />

        <div className="grid grid-cols-4 gap-4">
          {images?.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(img)}
              className={`h-24 w-full object-cover rounded-xl cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div>
        <h2 className="text-4xl font-semibold text-gray-800 mb-3">{productName}</h2>
        <p className="text-gray-500 mb-2 text-sm">Brand: <span className="text-gray-700 font-medium">{brandName}</span></p>
        <p className="text-gray-600 mb-4 text-sm">{shortDescription}</p>

        <div className="flex items-center space-x-3 mb-5">
          <p className="text-2xl font-bold text-blue-600">BDT {totalPrice.toFixed(2)}</p>
          <p className="text-lg line-through text-gray-400">BDT {(originalPrice * quantity).toFixed(2)}</p>
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">
            Save {discountPercentage}%
          </span>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={decreaseQty}
            className="w-9 h-9 rounded-full border text-xl text-gray-600 hover:bg-gray-100"
          >−</button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={increaseQty}
            className="w-9 h-9 rounded-full border text-xl text-gray-600 hover:bg-gray-100"
          >+</button>
        </div>

        {/* Add to Cart / View Cart */}
        {!inCart ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        ) : (
          <Link
            to="/cart"
            className="w-full block text-center bg-gray-100 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-200"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
