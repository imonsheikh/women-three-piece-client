import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useAddToCart from "../../hooks/useAddToCart";
import useUpdateQuantity from "../../hooks/useUpdateQuantity";
import useProducts from "../../hooks/useProducts";
import DOMPurify from "dompurify";
import { FaPhoneAlt, FaStar, FaWhatsapp } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import {
  FaCheckCircle,
  FaTruck,
  FaMoneyBillWave,
  FaShippingFast,
} from "react-icons/fa";
import FAQ from "../../components/FAQ.jsx";
import QuestionsTab from "../../components/QuestionTab.jsx";

const ProductDetails = () => {
  const [products] = useProducts();
  const { id } = useParams();
  const { user } = useAuth();
  const [carts, refetch] = useCart();
  const { addToCart } = useAddToCart();
  const updateQuantity = useUpdateQuantity();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItemId, setCartItemId] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [showInfo, setShowInfo] = useState(true);

  // Tabs
  const [activeTab, setActiveTab] = useState("description");

  // Reviews
  const [reviewStar, setReviewStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const found = products.find((p) => p._id === id);
    if (found) {
      setProduct(found);
      setMainImage(found.images[0]);
      setTotalPrice(found.productPrice);
    }
  }, [id, products]);

  useEffect(() => {
    if (carts && product?._id) {
      const found = carts.find((item) => item.productId === product._id);
      if (found) {
        setInCart(true);
        setQuantity(found.quantity);
        setCartItemId(found._id);
        setTotalPrice(found.totalPrice);
      } else {
        setInCart(false);
        setCartItemId(null);
        setQuantity(1);
        setTotalPrice(product.productPrice);
      }
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
    stock,
    sku,
    category,
  } = product;

  const originalPrice = productPrice / (1 - discountPercentage / 100);

  const increaseQty = async () => {
    if (!cartItemId) return;
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

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    if (result.success || result.alreadyInCart) {
      setInCart(true);
      refetch();
    }
  };

  const handleReviewSubmit = () => {
    if (reviewStar === 0 || reviewText.trim() === "") {
      alert("Please select a star and write your review.");
      return;
    }
    console.log("Review Submitted:", { star: reviewStar, text: reviewText });
    setReviewStar(0);
    setReviewText("");
    setHoverStar(0);
    alert("Thank you for your review!");
  };

  return (
    <div className="py-12 w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Image + Info */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <div className="overflow-hidden rounded-2xl shadow-sm mb-4">
              <img
                src={mainImage}
                alt={productName}
                className="w-full h-[350px] object-cover rounded-2xl transition-transform duration-300 hover:scale-110 cursor-zoom-in"
              />
            </div>
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

          {/* Product Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              {productName}
            </h2>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-semibold text-gray-800">Brand:</span>{" "}
              <span className="text-gray-700 font-medium">{brandName}</span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-semibold text-gray-800">SKU:</span>{" "}
              {sku || "N/A"}
            </p>
            <p className="text-gray-600 mb-4 text-sm">
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              {category}
            </p>

            <div className="flex items-center space-x-3 mb-5">
              <p className="text-2xl font-bold text-blue-600">
                BDT {totalPrice.toFixed(2)}
              </p>
              <p className="text-lg line-through text-gray-400">
                BDT {(originalPrice * quantity).toFixed(2)}
              </p>
              <span className="px-2 py-1 text-xs rounded-full text-red-800 bg-[#f6c600] font-semibold">
                Save {discountPercentage}%
              </span>
            </div>
            {/* Ratings */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${i < 4 ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
              <span className="text-gray-600 text-sm ml-2">(124 Reviews)</span>
            </div>
            <div className="flex gap-2">
              <p>Status: </p>
              <p
                className={`mb-4 text-sm font-medium ${
                  stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Quantity Control */}
            {inCart && (
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={decreaseQty}
                  className="w-9 h-9 rounded-full border text-xl text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="w-9 h-9 rounded-full border text-xl text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            )}

            {/* Add to Cart / View Cart */}
            {!inCart ? (
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  stock === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-primary-c text-white hover:bg-primary"
                }`}
                disabled={stock === 0}
              >
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
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

        {/* Right Info Box */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 md:top-24">
            <div
              className="md:hidden flex justify-between items-center cursor-pointer"
              onClick={() => setShowInfo((prev) => !prev)}
            >
              <h3 className="text-gray-800 font-semibold text-lg">
                Why Choose Us?
              </h3>
              <span className="text-2xl">{showInfo ? "−" : "+"}</span>
            </div>

            <ul
              className={`mt-4 space-y-3 text-sm text-gray-700 ${
                showInfo ? "block" : "hidden"
              } md:block`}
            >
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Best Quality
                Product Guarantee
              </li>
              <li className="flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-500" /> Cash On Delivery
                Available
              </li>
              <li className="flex items-center gap-2">
                <FaTruck className="text-orange-500" /> Delivery Charge Inside
                Dhaka <b>80 TK</b>
              </li>
              <li className="flex items-center gap-2">
                <FaShippingFast className="text-purple-500" /> Delivery Charge
                Outside Dhaka <b>150 TK</b>
              </li>
              <li className="flex items-center gap-2">
                <FaTruck className="text-green-500" /> Delivery Time: 2-4 Days
              </li>
            </ul>
          </div>

          {/* WhatsApp Box */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-start space-y-3">
            <h4 className="text-green-700 font-semibold text-lg">Need Help?</h4>
            <p className="text-sm text-gray-700">
              Chat with us on WhatsApp or call for instant support.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-700 font-medium hover:underline"
              >
                <FaWhatsapp className="text-2xl" /> WhatsApp 01845925526
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex justify-start gap-2 border-b border-b-2 border-gray-400 pb-2">
          {["description", "questions", "reviews", "how-to-order"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize font-medium p-2 transition ${
                  activeTab === tab
                    ? "text-blue-600 bg-blue-100 border-b-3 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            )
          )}
        </div>

        <div className="mt-6">
          {/* Description */}
          {activeTab === "description" && (
            <div
              className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortDescription),
              }}
            />
          )}

          {/* 2 Questions */}
          {activeTab === "questions" && (
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Existing FAQ */}
              <div className="md:col-span-2">
                <FAQ />
              </div>

              {/* Ask a Question Form */}
              <div className="md:col-span-1">
                <QuestionsTab />
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Existing Reviews */}
              <div className="space-y-2"></div>

              {/* Write Review */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-gray-800 font-semibold mb-2">
                  Write a Review
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-2xl ${
                        star <= (hoverStar || reviewStar)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoverStar(star)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => setReviewStar(star)}
                    />
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                ></textarea>
                <button
                  onClick={handleReviewSubmit}
                  className="mt-2 px-4 py-2 bg-primary-c text-white rounded-lg hover:bg-primary transition"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {/* How to Order */}
          {activeTab === "how-to-order" && (
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Select your desired product and quantity.</li>
              <li>
                Click <b>Add to Cart</b>.
              </li>
              <li>
                Go to your cart and click <b>Checkout</b>.
              </li>
              <li>Provide shipping details & confirm payment.</li>
            </ol>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h3 className="text-2xl text-center font-semibold mb-4">
          Related Products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter(
              (p) => p.category === product.category && p._id !== product._id
            )
            .slice(0, 4)
            .map((related) => (
              <ProductCard key={related._id} product={related} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
