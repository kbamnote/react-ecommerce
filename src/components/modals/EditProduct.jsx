import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditProduct = ({ product, onEditProduct, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onEditProduct(product.id, { ...form, price: +form.price });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Product
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            name="title" 
            placeholder="Product Title" 
            value={form.title} 
            onChange={handleChange} 
            required 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
          />
          
          <textarea 
            name="description" 
            placeholder="Product Description" 
            value={form.description} 
            onChange={handleChange} 
            required 
            rows="3" 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" 
          />
          
          <input 
            type="number"
  step="0.01"
            name="price" 
            placeholder="Price ($)" 
            value={form.price} 
            onChange={handleChange} 
            required 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
          />
          
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            required 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          
          <input 
            type="url" 
            name="image" 
            placeholder="Image URL" 
            value={form.image} 
            onChange={handleChange} 
            required 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
          />

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 disabled:opacity-70 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;