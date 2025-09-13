import React from "react";
import { ShoppingCart, Search, User } from "lucide-react";

const Header = ({ cartCount = 0, searchTerm = "", onSearchChange }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </div>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}   
              onChange={(e) => onSearchChange?.(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
