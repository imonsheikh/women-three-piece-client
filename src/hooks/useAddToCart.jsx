import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useCart from "./useCart";
import { useNavigate } from "react-router-dom";

const useAddToCart = () => { 
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useCart(); 
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Login first!!!"); 
      navigate("/login")
      return { success: false };
    }

    const totalPrice = product.productPrice * quantity;

    const cartProduct = {
      productId: product._id,
      productName: product.productName,
      brandName: product.brandName,
      shortDescription: product.shortDescription,
      productPrice: product.productPrice,
      discountPercentage: product.discountPercentage,
      category: product.category,
      type: product.type,
      offer: product.offer,
      isAvailable: product.isAvailable,
      images: product.images,
      userEmail: user?.email,
      quantity,
      totalPrice,
    };

    try {
      setLoading(true);
      const res = await axiosPublic.post("/cart", cartProduct);

      if (res.data?.insertedId) {
        toast.success("Add to cart Success");
        refetch();
        return { success: true };
      } else {
        toast.error("Add to cart failed");
        return { success: false };
      }
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg === "Product already in cart") {
        toast.error("Product already in cart");
        refetch();
        return { success: false, alreadyInCart: true };
      } else {
        toast.error(msg || error.message || "Something went wrong");
        return { success: false };
      }
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
};

export default useAddToCart;
