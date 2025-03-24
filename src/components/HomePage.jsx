"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { FiSearch } from "react-icons/fi";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Menu from "./Menu";
import { products } from "@/constants/products";

const HomePage = () => {
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Debug log for cart state
  useEffect(() => {
    console.log("HomePage - Cart state:", cart);
  }, [cart]);

  // Group products by category
  const categories = ['all', 'bedsheets', 'quilts', 'cushion-covers', 'table-covers', 'bathrobes', 'towels', 'bags', 'kitchen-textiles', 'curtains'];
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Filter categories based on selected category
  const filteredCategories = selectedCategory === 'all' 
    ? Object.keys(groupedProducts)
    : [selectedCategory];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white">
      <Header title="Ora" />
      
      {/* Search Bar */}
      <div className="pt-14 px-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
          <FiSearch size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-[15px] placeholder:text-gray-400 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#FC8019] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div className="px-4 space-y-6 pb-32">
        {filteredCategories.map((category) => (
          <div key={category}>
            <h2 className="text-[17px] font-medium text-gray-800 mb-3">
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {groupedProducts[category]?.map((product) => (
                <div key={product.id} className="flex-none w-[calc(40%-6px)]">
                  <ProductCard
                    product={product}
                    isHorizontal
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => router.push('/cart')}
          className="fixed bottom-4 right-4 bg-[#FC8019] text-white p-4 rounded-full shadow-lg"
        >
          <span className="absolute -top-1 -right-1 bg-white text-[#FC8019] text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      )}

      {/* View Cart Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-gray-500">Total Items</p>
              <p className="text-[15px] font-medium">{totalItems} items</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-gray-500">Total Amount</p>
              <p className="text-[15px] font-medium">₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-[#FC8019] text-white py-3 rounded-lg font-medium"
          >
            View Cart
          </button>
        </div>
      )}

      <Menu />
    </div>
  );
};

export default HomePage;
