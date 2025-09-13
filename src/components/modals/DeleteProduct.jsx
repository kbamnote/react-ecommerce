import React from "react";
import { X, AlertTriangle } from "lucide-react";

const DeleteProduct = ({ isOpen, onConfirm, onCancel, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Delete Product</h2>
          </div>
          <button 
            onClick={onCancel} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 text-center leading-relaxed">
            Are you sure you want to delete 
            <span className="font-semibold text-gray-800 block mt-1">"{productName}"</span>
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onCancel} 
            className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;