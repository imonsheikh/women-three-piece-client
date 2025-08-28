import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useCategories from "../../../hooks/useCategories.jsx";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const ManageSubCategory = () => {
  const [categories] = useCategories(); // parent categories
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [editing, setEditing] = useState(null); // edit modal state

  // load subcategories initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/subcategories");
        setSubCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [axiosSecure]);

  // ✅ Add Subcategory
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.subCategoryName.value;
    const categoryId = form.categoryId.value;
    console.log(name, categoryId);

    try {
      setLoading(true);
      const res = await axiosSecure.post("/subcategories", {
        name,
        categoryId,
      });
      console.log("response", res);

      setSubCategories([...subCategories, res.data]);
      toast.success(" Sub Category Added Successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  //  Delete Subcategory
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axiosSecure.delete(`/subcategories/${id}`);
        setSubCategories(subCategories.filter((sc) => sc._id !== id));
        toast.success(" Sub Category Deleted");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete subcategory");
      }
    }
  };

  // ✅ Update Subcategory
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.subCategoryName.value;
    const categoryId = form.categoryId.value;

    try {
      const res = await axiosSecure.put(`/subcategories/${editing._id}`, {
        name,
        categoryId,
      });

      setSubCategories(
        subCategories.map((sc) =>
          sc._id === editing._id ? { ...sc, name, categoryId } : sc
        )
      );
      toast.success("Sub Category Updated");
      setEditing(null);
    } catch (error) {
      console.error(error);
      toast.error(" Failed to update subcategory");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Manage Sub Categories
        </h1>

        <h2 className="text-lg font-semibold mb-6 text-center text-gray-600">
          Total Sub Categories: {subCategories.length}
        </h2>

        {/* Add Sub Category Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Select Main Category
            </label>
            <select
              name="categoryId"
              className="select select-bordered w-full"
              required
            >
              <option value="">-- Select Category --</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Sub Category Name
            </label>
            <input
              type="text"
              name="subCategoryName"
              className="input input-bordered w-full"
              placeholder="Enter subcategory name"
              required
            />
          </div>

          <div className="col-span-1 flex items-end">
            <button
              type="submit"
              className="btn w-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Adding..." : " Add Sub Category"}
            </button>
          </div>
        </form>

        {/* SubCategory Table */}
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Sub Category</th>
                <th className="py-3 px-4">Main Category</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.length > 0 ? (
                subCategories.map((sc, index) => (
                  <tr
                    key={sc._id}
                    className="hover:bg-gray-50 transition text-gray-800"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{sc.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {categories.find((cat) => cat._id === sc.categoryId)
                        ?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center space-x-4">
                      {/* Edit */}
                      <button
                        onClick={() => setEditing(sc)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(sc._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No subcategories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*  Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Sub Category</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Main Category
                  </label>
                  <select
                    name="categoryId"
                    defaultValue={editing.categoryId}
                    className="select select-bordered w-full"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Sub Category Name
                  </label>
                  <input
                    type="text"
                    name="subCategoryName"
                    defaultValue={editing.name}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="btn bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubCategory;
