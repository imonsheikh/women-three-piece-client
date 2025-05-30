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

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddProduct = () => { 
  const [categories =[], isLoading, refetch]= useCategories() 
  console.log(categories);
  
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [previews, setPreviews] = useState({
    // name: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  console.log(previews);

  // const categories = [
  //   {
  //     _id: "67bdcb3a81575fdceb70d829",
  //     categoryName: "Personal Product",
  //     image: "https://example.com/images/personal.jpg",
  //   },
  //   {
  //     _id: "67bdcb3a81575fdceb70d830",
  //     categoryName: "Electronics",
  //     image: "https://example.com/images/electronics.jpg",
  //   },
  //   {
  //     _id: "67bdcb3a81575fdceb70d831",
  //     categoryName: "Home & Kitchen",
  //     image: "https://example.com/images/home-kitchen.jpg",
  //   },
  //   {
  //     _id: "67bdcb3a81575fdceb70d832",
  //     categoryName: "Fashion",
  //     image: "https://example.com/images/fashion.jpg",
  //   },
  //   {
  //     _id: "67bdcb3a81575fdceb70d833",
  //     categoryName: "Books & Stationery",
  //     image: "https://example.com/images/books.jpg",
  //   },
  // ];

  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    // console.log(id);
    // Update state for preview
    setPreviews({
      ...previews,
      [id]: files[0],
    });

    // Register image file manually in react-hook-form
    // setValue(id, files[0]);
  };

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

      //  Create final product object
      const productData = {
        productName: data.productName,
        brandName: data.brandName,
        shortDescription: data.shortDescription,
        productPrice: parseFloat(data.productPrice),
        discountPercentage: parseFloat(data.discountPercentage),
        category: data.category,
        type: data.type,
        offer: data.offer === "true",
        isAvailable: data.isAvailable === "true",
        images: uploadedImageURLs,
        user: user?.email,
      };

      console.log("Final Product Data:", productData);

      // Send to your backend (optional)
      const res = await axiosSecure.post("/products", productData);
      if (res.data.insertedId) {
        toast("Product Added Successfully");
        reset(); // reset form
        setPreviews({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
  <Container>
      <div className="min-h-screen bg-soft">
      <div className=" py-2">
        <Title>Add Products</Title>
      </div>
      <div className="border p-5">
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
          <div className="flex flex-col gap-2  w-full text-start">
            {/* Image1 */}
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
                      name=""
                      id={imageId}
                      hidden
                      // disabled={loading}
                    />
                    <p className="font-bold text-lg">
                      {previews[imageId] ? "Change" : "Upload"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Type product name here..."
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
                name="brandName"
                placeholder="type brand name here"
                {...register("brandName", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                {...register("shortDescription", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <div className="flex lg:flex-row flex-col justify-between gap-2.5">
              <div className="lg:w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  type="number"
                  name="productPrice"
                  placeholder="type product price here"
                  {...register("productPrice", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="lg:w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Product Discount percentage
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  placeholder="type discount percentage %"
                  {...register("discountPercentage", { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="lg:w-9/12 flex md:flex-row gap-2 flex-col">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                defaultValue="" 
                name="category"
                {...register("category", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" >Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <select  
                defaultValue="" 

                name="type"
                {...register("type", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" className=""  >
                  Select Type
                </option>
                <option value="new_arrivals">New Arrivals</option>
                <option value="best_sellers">Best sellers</option>
                <option value="special_offers">Special Offers</option>
                <option value="promotions">Promotions</option>
                <option value="promotions">Eid offers</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Offer</label>
              <select
                name="offer"
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
                name="isAvailable"
                {...register("isAvailable", { required: true })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          <div className="flex justify-start mt-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-md font-medium transition duration-200 ${
                loading
                  ? "bg-green-500 text-white cursor-not-allowed opacity-70"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <TbFidgetSpinner className="animate-spin text-lg" />
                  Processing... Please wait
                </span>
              ) : (
                "Add Medicine"
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
