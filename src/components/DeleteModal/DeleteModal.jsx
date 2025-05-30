import React from "react";

const DeleteModal = ({ product, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
        <p className="my-4">Are you sure you want to delete <strong>{product.productName}</strong>?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
