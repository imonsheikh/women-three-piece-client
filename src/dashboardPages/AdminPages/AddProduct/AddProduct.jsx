import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Title from "../../../components/Title.jsx";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import Container from "../../../components/Container/Container.jsx";
import useCategories from "../../../hooks/useCategories.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddProduct = () => {
  const [categories = [], isLoading] = useCategories();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [description, setDescription] = useState(""); // Rich text editor value

  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const { register, handleSubmit, reset, watch } = useForm();
  const selectedCategory = watch("category"); // For dependent sub-category

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    setPreviews({
      ...previews,
      [id]: files[0],
    });
  };

  // const subCategories = {
  //   Electronics: ["Laptop", "Mobile", "TV", "Camera"],
  //   Fashion: ["Men", "Women", "Kids"],
  //   "Home & Kitchen": ["Furniture", "Cookware", "Decor"],
  //   Books: ["Fiction", "Non-Fiction", "Comics", "Educational"],
  // };

  const handleAddProduct = async (data) => {
    try {
      setLoading(true);

      const imageFiles = [
        previews.image1,
        previews.image2,
        previews.image3,
        previews.image4,
      ];
      const uploadedImageURLs = [];

      for (const image of imageFiles) {
        if (image) {
          const formData = new FormData();
          formData.append("image", image);

          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const imgData = await res.json();
          if (imgData.success) {
            uploadedImageURLs.push(imgData.data.url);
          } else {
            throw new Error("Image upload failed");
          }
        }
      } 

      // Function to generate SKU
const generateSKU = (categoryName, subCategoryName) => {
  const catCode = categoryName?.substring(0, 1).toUpperCase() || "G";
  const subCode = subCategoryName?.substring(0, 1).toUpperCase() || "D";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit
  return `${catCode}${subCode}-${randomNum}`; // e.g. "ED-483927"
};

// Inside handleAddProduct function
const sku = generateSKU(data.category, data.subCategory);

      //  Final product object
      const productData = {
       sku, // 8-digit auto-generated
        stock: parseInt(data.stock),
        productName: data.productName,
        brandName: data.brandName,
        shortDescription: description,
        productPrice: parseFloat(data.productPrice),
        discountPercentage: parseFloat(data.discountPercentage),
        category: data.category,
        subCategory: data.subCategory,
        type: data.type,
        offer: data.offer === "true",
        isAvailable: data.isAvailable === "true",
        images: uploadedImageURLs,
        user: user?.email,
      };

      const res = await axiosSecure.post("/products", productData);
      if (res.data.insertedId) {
        toast.success(" Product Added Successfully");
        reset();
        setPreviews({ image1: null, image2: null, image3: null, image4: null });
        setDescription("");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error(" Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-screen bg-soft">
        <div className="py-2">
          <Title>Add Products</Title>
        </div>
        <div className="border p-5">
          <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
            {/* Upload Images */}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-2 text-center">
              {["image1", "image2", "image3", "image4"].map((imageId) => (
                <label key={imageId} htmlFor={imageId}>
                  <div className="text-gray-500 border-2 border-dashed border-gray-500 px-4 py-2 hover:border-black duration-300 ease-in-out cursor-pointer rounded-md">
                    {previews[imageId] ? (
                      <img
                        src={URL.createObjectURL(previews[imageId])}
                        alt="preview"
                        className="w-full h-20 object-cover mb-2 rounded-md"
                      />
                    ) : (
                      <IoMdCloudUpload className="w-20 h-20 mx-auto" />
                    )}

                    <input
                      onChange={handleImageChange}
                      type="file"
                      id={imageId}
                      hidden
                    />
                    <p className="font-bold text-lg">
                      {previews[imageId] ? "Change" : "Upload"}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* SKU + Stock */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Available stock"
                  {...register("stock", { required: true, min: 0 })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Name + Brand */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Brand Name
              </label>
              <input
                type="text"
                {...register("brandName", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Detailed Description
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="bg-white mt-1"
              />
            </div>

            {/* Price + Discount */}
            <div className="flex lg:flex-row flex-col justify-between gap-2.5">
              <div className="lg:w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  type="number"
                  {...register("productPrice", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="lg:w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  {...register("discountPercentage", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Category + SubCategory + Type */}
            <div className="lg:w-9/12 flex md:flex-row gap-2 flex-col">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  defaultValue=""
                  {...register("category", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">
                  Sub-Category
                </label>
                <select
                  defaultValue=""
                  {...register("subCategory", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Sub Category</option>
                  {selectedCategory &&
                    subCategories[selectedCategory]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  defaultValue=""
                  {...register("type", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="new_arrivals">New Arrivals</option>
                  <option value="best_sellers">Best Sellers</option>
                  <option value="special_offers">Special Offers</option>
                  <option value="promotions">Promotions</option>
                </select>
              </div>
            </div>

            {/* Offer + Availability */}
            <div className="lg:w-9/12 flex md:flex-row gap-2 flex-col">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">Offer</label>
                <select
                  {...register("offer", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">
                  Is Available
                </label>
                <select
                  {...register("isAvailable", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-start mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-5 py-2 rounded-md font-medium transition duration-200 ${
                  loading
                    ? "bg-green-500 text-white cursor-not-allowed opacity-70"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <TbFidgetSpinner className="animate-spin text-lg " />
                    Processing... Please wait
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddProduct;
