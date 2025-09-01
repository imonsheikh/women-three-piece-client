import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Container from "../../../components/Container/Container.jsx";
import useBanners from "../../../hooks/useBanners.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const BannerAdmin = () => {
  const [banners, isLoading, refetch] = useBanners();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false); 

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const openModal = (banner = null) => {
    setIsModalOpen(true);
    setIsEditMode(!!banner);
    setCurrentBanner(banner);
    setPreviewImage(banner ? banner.image : null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentBanner(null);
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const imageFile = form.image.files[0]; 
//   console.log(title, imageFile);
  

  try {
    setLoading(true);

    let imageUrl = currentBanner?.image || "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });
      // console.log(response);
      
      const imgData = await response.json();

      if (imgData.success) {
        imageUrl = imgData.data.display_url;
      } else {
        toast.error("Banner image upload failed");
        setLoading(false);
        return;
      }
    }

    const bannerData = { title, image: imageUrl };

    if (isEditMode) {
      await axiosSecure.put(`/banners/${currentBanner._id}`, bannerData);
      toast.success(" Banner updated successfully");
    } else {
      await axiosSecure.post("/banners", bannerData);
      toast.success("Banner added successfully");
    }

    refetch();
    closeModal();
  } catch (error) {
    console.error("Error submitting banner:", error);
    toast.error(" Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        await axiosSecure.delete(`/banners/${id}`);
        toast.success("Banner deleted successfully");
        refetch();
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <Container>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Banners</h1>
        <div className="flex justify-between mb-4">
          <h1 className="font-semibold">Total Banners: {banners?.length}</h1>
          <button
            className="btn bg-blue-500 text-white"
            onClick={() => openModal()}
          >
            Add New Banner
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-primary-c text-white/90">
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Link</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="flex justify-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(item)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={closeModal}
              >
                ✕
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEditMode ? "Edit Banner" : "Add New Banner"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Banner Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={currentBanner?.title || ""}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                {/* <div>
                  <label className="block text-gray-700 mb-1">Redirect Link</label>
                  <input
                    type="url"
                    name="link"
                    defaultValue={currentBanner?.link || ""}
                    className="input input-bordered w-full"
                    required
                  />
                </div> */}
                <div>
                  <label className="block text-gray-700 mb-1">Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImageChange}
                    required={!isEditMode}
                  />
                </div>
                {previewImage && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Preview:</p>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg border"
                    />
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="btn w-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {loading
                      ? isEditMode
                        ? "Updating..."
                        : "Adding..."
                      : isEditMode
                      ? "Update Banner"
                      : "Add Banner"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BannerAdmin;
