import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/DeleteModal/DeleteModal.jsx";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load products
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/products")
      .then((res) => setProducts(res.data.reverse()))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/product/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Product deleted");
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error("Deletion failed");
    } finally {
      setSelectedProduct(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-soft p-4">
      <Title>Manage Products</Title>

      <div className="text-lg font-medium mt-2 mb-4 text-gray-700">
        Total Products: {products.length}
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      ) : (
        <>
          <div className="overflow-x-auto mt-2">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-primary-c text-white/90 text-center">
                <tr>
                  <th className="p-2 border">SL</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Brand</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Discount</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Available</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={product._id} className="hover:bg-gray-50 text-center">
                    <td className="p-2 border">{startIndex + index + 1}</td>
                    <td className="p-2 border">
                      <img
                        src={product.images?.[0]}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-2 border">{product.productName}</td>
                    <td className="p-2 border">{product.brandName}</td>
                    <td className="p-2 border">BDT {product.productPrice}</td>
                    <td className="p-2 border">{product.discountPercentage}%</td>
                    <td className="bg-red-200 p-2 border font-semibold text-gray-700">
                      {product.stock ?? 0}
                    </td>
                    <td className="p-2 border">
                      {product.isAvailable ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => alert("Feature Will be coming soon")}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-red-600 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Delete Modal */}
      {selectedProduct && (
        <DeleteModal
          product={selectedProduct}
          onConfirm={() => handleDelete(selectedProduct._id)}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ManageProducts;
