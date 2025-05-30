import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import toast from "react-hot-toast";
import Container from "../../../components/Container/Container";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get(`/product/${id}`).then((res) => {
      setProduct(res.data);
      reset(res.data); // pre-fill form
    });
  }, [axiosSecure, id, reset]);

  const onSubmit = async (data) => {
    try {
      const updated = {
        ...product,
        ...data,
        productPrice: parseFloat(data.productPrice),
        discountPercentage: parseFloat(data.discountPercentage),
        offer: data.offer === "true",
        isAvailable: data.isAvailable === "true",
      };
      const res = await axiosSecure.patch(`/products/${id}`, updated);
      if (res.data.modifiedCount > 0) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/manage-products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

//   if (!product) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div className="text-center mt-10">Feature Will coming Soon...</div>;

  return (
    <Container>
      <Title>Update Product</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5 border rounded bg-white">
        <input {...register("productName")} placeholder="Product Name" className="input" />
        <input {...register("brandName")} placeholder="Brand" className="input" />
        <textarea {...register("shortDescription")} placeholder="Short Description" className="input" />
        <input {...register("productPrice")} type="number" placeholder="Price" className="input" />
        <input {...register("discountPercentage")} type="number" placeholder="Discount (%)" className="input" />

        <select {...register("category")} className="input">
          <option value="Personal Product">Personal Product</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Fashion">Fashion</option>
          <option value="Books & Stationery">Books & Stationery</option>
        </select>

        <select {...register("type")} className="input">
          <option value="new_arrivals">New Arrivals</option>
          <option value="best_sellers">Best Sellers</option>
          <option value="special_offers">Special Offers</option>
          <option value="promotions">Promotions</option>
        </select>

        <select {...register("offer")} className="input">
          <option value="false">No Offer</option>
          <option value="true">Offer</option>
        </select>

        <select {...register("isAvailable")} className="input">
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700">
          Update Product
        </button>
      </form>
    </Container>
  );
};

export default UpdateProduct;
