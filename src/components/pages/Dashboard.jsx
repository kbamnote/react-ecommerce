import React, { useEffect, useState } from "react";
import { getAllProducts, getAllCategories } from "../utils/Api";
import { Plus } from "lucide-react";
import Loading from "../common/Loading";
import Header from "../common/Header";
import ProductCard from "../cards/ProductCard";
import AddProductForm from "../modals/AddProduct";
import EditProductForm from "../modals/EditProduct";
import DeleteProduct from "../modals/DeleteProduct";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products + categories once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes.data);
        setCategories(["all", ...categoriesRes.data]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Client-side filtering
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddProduct = (p) => {
    setProducts((prev) => [...prev, { ...p, id: Date.now() }]);
  };

  const handleEditProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...updatedProduct, id } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  if (loading) return <Loading message="Fetching products..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Product Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-5 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
            {selectedCategory !== "all" && ` in "${selectedCategory}"`}
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={addToCart}
              onEdit={() => openEditForm(p)}
              onDelete={() => openDeleteModal(p)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddProductForm
          onAddProduct={handleAddProduct}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && (
        <EditProductForm
          product={editingProduct}
          onEditProduct={handleEditProduct}
          onClose={() => {
            setShowEditForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <DeleteProduct
        isOpen={showDeleteModal}
        onConfirm={() => handleDeleteProduct(productToDelete?.id)}
        onCancel={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        productName={productToDelete?.title}
      />
    </div>
  );
};

export default Dashboard;
