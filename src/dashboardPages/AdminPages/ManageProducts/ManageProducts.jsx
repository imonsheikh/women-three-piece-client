import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Title>Manage Products</Title>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 uppercase text-gray-700">
              <tr>
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Product</th>
                <th className="py-3 px-5">Price (BDT)</th>
                <th className="py-3 px-5">Stock</th>
                <th className="py-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-5">{(currentPage - 1) * productsPerPage + index + 1}</td>
                  <td className="py-3 px-5 font-medium text-gray-900">{product.name}</td>
                  <td className="py-3 px-5">
                    {(Number(product.price) || 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-5">{product.stock || "N/A"}</td>
                  <td className="py-3 px-5 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => alert("Implement update logic here")}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 py-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === idx + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
