import useAxiosSecure from "./useAxiosSecure.jsx";

const useUpdateQuantity = () => {
  const axiosSecure = useAxiosSecure();

  const update = async (id, action) => {
    try {
      const response = await axiosSecure.patch(`/cart/${id}/${action}`);
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error("Quantity update failed:", error);
      throw error;
    }
  };

  return update;
};

export default useUpdateQuantity;
