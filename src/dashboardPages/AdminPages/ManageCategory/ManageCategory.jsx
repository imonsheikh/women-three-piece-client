import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import useCategories from '../../../hooks/useCategories.jsx';
import Container from '../../../components/Container/Container.jsx';
import toast from 'react-hot-toast';

const ManageCategory = () => {
//   const [categories, setCategories] = useState();
  const [categories, isLoading, refetch] = useCategories()
  const [loading, setLoading] = useState()
  // console.log(categories);
  
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); 

  // const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

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
      setLoading(true)
      let imageUrl = currentCategory?.image || ''; 
      let publicId = currentCategory?.public_id || "";


      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile); 


        // const response = await fetch(imageHostingUrl, {
        //   method: "POST",
        //   body: formData
        // }); // Secure image upload
        // const imgData = await response.json()
        // if(imgData){
        //   imageUrl = imgData.data.display_url;  
         
        const uploadRes = await axiosSecure.post("/upload-category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadRes.data.success) {
        imageUrl = uploadRes.data.url;
        publicId = uploadRes.data.public_id;

        }else{
        toast.error('category image upload failed')
        return
      } 
      }

      const categoryData = { name: categoryName, image: imageUrl, public_id: publicId };

      if (isEditMode) {
        await axiosSecure.put(`/categories/${currentCategory._id}`, categoryData);
        toast.success('Category Updated Successfully')
        refetch()
      } else {
        await axiosSecure.post('/categories', categoryData);
        toast.success('Category Added Successfully')
        refetch()
      }

    //   fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error submitting category:', error);
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await axiosSecure.delete(`/categories/${id}`);
        // fetchCategories();
        toast.success('Category Deleted Successfully')
        refetch()
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
  <Container>
      <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Categories</h1>
      <div className="flex justify-between mb-4"> 
        <h1 className='font-semibold'>Total Category: {categories?.length}</h1>
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
            <tr className="bg-primary-c text-white/90">
              <th>#</th>
              <th>Image</th>
              <th>Category Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{item.name}</td>
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
                  {loading ? (isEditMode ? "Updating..." : "Adding...") : isEditMode ? "Update Category" : "Add Category"}
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

export default ManageCategory;
