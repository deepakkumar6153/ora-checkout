"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { FiSearch } from "react-icons/fi";
import ProductCard from "./ProductCard";
import Menu from "./Menu";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    products, 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    categories 
  } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");

  // Debug log for cart state
  React.useEffect(() => {
    console.log("HomePage - Cart state:", cart);
  }, [cart]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product) return false;
      const name = product.name?.toLowerCase() || '';
      const category = product.category?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return name.includes(query) || category.includes(query);
    });
  }, [products, searchQuery]);

  // Memoize grouped products
  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!product || !product.category) return acc;
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  // Memoize filtered categories
  const filteredCategories = useMemo(() => {
    return selectedCategory === 'all' 
      ? Object.keys(groupedProducts)
      : [selectedCategory];
  }, [selectedCategory, groupedProducts]);

  // Memoize cart totals
  const { totalItems, totalAmount } = useMemo(() => {
    const items = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const amount = cart.reduce((sum, item) => sum + ((item.finalPrice || 0) * (item.quantity || 0)), 0);
    return { totalItems: items, totalAmount: amount };
  }, [cart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Menu />
        <div className="flex items-center justify-center h-[calc(100vh-56px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC8019]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Menu />
      <div className="pb-32">
        {/* Search Bar */}
        <div className="py-3">
          <div className="relative bg-gray-50 rounded-lg">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for 'Power Bank'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[15px] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Categories Slider */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 px-4 py-3">
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
                {category === 'all' ? 'All Products' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="px-4">
          {filteredCategories.map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-[17px] font-medium text-gray-800 mb-3">
                {category === 'all' ? 'All Products' : category}
              </h2>
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
                {groupedProducts[category]?.map((product) => (
                  <div key={product.id} className="flex-none w-[32vw]">
                    <ProductCard product={product} isHorizontal />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 bg-[#FC8019] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[13px]">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
                  <span className="text-[15px] font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/cart')}
                className="bg-[#FC8019] text-white px-8 py-3 rounded-lg text-[15px] font-medium w-[45%] flex items-center justify-center"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
