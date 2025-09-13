import React from "react";
import { ShoppingCart, Star, Edit, Trash2 } from "lucide-react";

const ProductCard = ({ product, onAddToCart, onEdit, onDelete }) => {
  const { id, image, title, description, price, rating, category } = product;

  return (
    <div className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <img src={image} alt={title} className="h-48 w-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 rounded-full px-3 py-2 flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-semibold">{rating?.rate}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="font-bold text-xl mb-3 text-gray-800 line-clamp-2 leading-tight">{title}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-bold text-emerald-600">${price.toFixed(2)}</span>
          <span className="bg-blue-50 text-blue-700 text-xs px-4 py-2 rounded-full font-medium border border-blue-200">{category}</span>
        </div>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onEdit && onEdit(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            
            <button
              onClick={() => onDelete && onDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;