import React, { useState } from "react";
import { X, Star } from "lucide-react";

const AddProduct = ({ onAddProduct, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStarClick = (starIndex) => {
    setForm({ 
      ...form, 
      rating: { ...form.rating, rate: starIndex } 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddProduct({ ...form, price: Number(form.price) });
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      rating: { rate: 0, count: 0 },
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {form.image && (
            <img src={form.image} alt="Preview" className="h-32 w-full object-contain rounded-lg border" />
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= form.rating.rate
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {form.rating.rate > 0 ? `${form.rating.rate}/5 stars` : 'No rating'}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;