"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { useMenu } from "@/context/MenuContext";
import { FiSearch, FiX, FiShoppingCart } from "react-icons/fi";
import ProductCard from "./ProductCard";
import Menu from "./Menu";
import { CATEGORY_COLORS } from "@/constants/colors";

const HomePage = () => {
  const router = useRouter();
  const { isOpen } = useMenu();
  const {
    cart,
    addToCart,
    updateQuantity,
    products,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    categories,
  } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");

  // Debug log for cart state
  React.useEffect(() => {
    console.log("HomePage - Cart state:", cart);
  }, [cart]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product) return false;
      const name = product.name?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
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
    return selectedCategory === "all"
      ? Object.keys(groupedProducts)
      : [selectedCategory];
  }, [selectedCategory, groupedProducts]);

  // Calculate total items in cart
  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Function to get color for a category
  const getCategoryColor = (category) => {
    const index = categories.indexOf(category) % CATEGORY_COLORS.length;
    return CATEGORY_COLORS[index];
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Navigate to cart
  const handleViewCart = () => {
    router.push("/cart");
  };

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
    <div className="min-h-screen flex flex-col">
      <Menu />
      <div className="flex-1 relative">
        {/* Sticky search and filter strip */}
        <div className="sticky top-14 z-40 glass border-b border-[var(--border)]">
          {/* Search Bar */}
          <div className="py-3 px-4">
            <div className="relative glass-light rounded-lg">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-transparent rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-11 h-11 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-4 pb-3 hidden">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                  selectedCategory === "all"
                    ? "bg-[#FC8019] text-white"
                    : "glass-light text-gray-600 hover:bg-white/20"
                }`}
              >
                All
              </button>
              {categories
                .filter((category) => category !== "all")
                .map((category) => {
                  const categoryColor = getCategoryColor(category);
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all active:scale-95`}
                      style={{
                        backgroundColor:
                          selectedCategory === category
                            ? categoryColor.bg
                            : "rgba(255, 255, 255, 0.1)",
                        color:
                          selectedCategory === category
                            ? categoryColor.text
                            : "#4b5563",
                        border: `2px solid ${
                          selectedCategory === category
                            ? categoryColor.border
                            : "transparent"
                        }`,
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="absolute inset-0 overflow-y-auto pt-[120px]">
          {/* Product Categories */}
          {filteredCategories.map((category) => {
            const categoryColor = getCategoryColor(category);
            return (
              <div key={category} className="mb-8">
                {/* Category Section with Background */}
                <div
                  className="rounded-lg glass"
                  style={{ backgroundColor: `${categoryColor.bg}40` }}
                >
                  {/* Category Header */}
                  <div className="px-4 pt-4">
                    <h2
                      className="text-[15px] font-medium"
                      style={{ color: categoryColor.text }}
                    >
                      {category}
                    </h2>
                  </div>

                  {/* Product Grid */}
                  <div className="flex gap-4 overflow-x-auto px-4 pb-4">
                    {groupedProducts[category]?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addToCart}
                        onUpdateQuantity={updateQuantity}
                        cartItem={cart.find((item) => item.id === product.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && !isOpen && (
        <button
          onClick={handleViewCart}
          className="fixed bottom-10 right-6 w-16 h-16 bg-[#FC8019] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#e67316] active:scale-95 transition-all z-40 relative overflow-hidden"
          style={{ position: 'fixed', right: '1.5rem', bottom: '8.5rem' }}
          aria-label="View cart"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine"></div>
          <div className="relative flex items-center justify-center">
            <FiShoppingCart size={28} className="font-light" />
            <span className="absolute -top-2 -right-2 bg-white text-[#FC8019] text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

export default HomePage;
