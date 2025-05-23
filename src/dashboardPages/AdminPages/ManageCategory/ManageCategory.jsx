import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import useCategories from '../../../hooks/useCategories.jsx';

const ManageCategory = () => {
//   const [categories, setCategories] = useState();
  const [categories, isLoading, refetch] = useCategories()
  console.log(categories);
  
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); 

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

//   useEffect(() => {
//     // fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosSecure.get('/api/categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

  const openModal = (category = null) => {
    setIsModalOpen(true);
    setIsEditMode(!!category);
    setCurrentCategory(category);
    setPreviewImage(category ? category.image : null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentCategory(null);
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
    const categoryName = form.categoryName.value;
    const imageFile = form.image.files[0];

    try {
      let imageUrl = currentCategory?.image || '';
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('image', imageFile);
        const imgRes = await axiosSecure.post(imageHostingUrl, imageData); // Secure image upload
        imageUrl = imgRes.data.data.display_url;
      }

      const categoryData = { name: categoryName, image: imageUrl };

      if (isEditMode) {
        await axiosSecure.put(`/api/categories/${currentCategory._id}`, categoryData);
      } else {
        await axiosSecure.post('/api/categories', categoryData);
      }

    //   fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await axiosSecure.delete(`/api/categories/${id}`);
        // fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Categories</h1>
      <div className="flex justify-end mb-4">
        <button
          className="btn bg-blue-500 text-white"
          onClick={() => openModal()}
        >
          Add New Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{cat.name}</td>
                <td className="flex justify-center gap-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(cat)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {isEditMode ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  defaultValue={currentCategory?.name || ''}
                  className="input input-bordered w-full"
                  required
                />
              </div>
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
                  {isEditMode ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
