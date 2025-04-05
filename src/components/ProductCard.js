"use client";
import React, { useState } from 'react';
import { useOrder } from "../context/OrderContext";
import { FiMinus, FiPlus } from "react-icons/fi";
import Image from "next/image";
import { CATEGORY_COLORS } from "@/constants/colors";

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, categories } = useOrder();
  const itemInCart = cart.find(item => item.id === product.id);
  const quantity = itemInCart?.quantity || 0;
  const [imageError, setImageError] = useState(false);

  // Function to get color for a category
  const getCategoryColor = (category) => {
    const index = categories.indexOf(category) % CATEGORY_COLORS.length;
    return CATEGORY_COLORS[index];
  };

  const handleAdd = () => {
    console.log("Adding product to cart:", product);
    addToCart({
      ...product,
      finalPrice: product.salePrice
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Function to ensure image URL is properly formatted
  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already a complete URL, return as is
    if (url.startsWith('https://')) return url;
    // If it's a Google Drive ID, construct the proper URL
    if (url.includes('drive.google.com')) {
      const fileId = url.split('id=')[1];
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    }
    return url;
  };

  const categoryColor = getCategoryColor(product.category);

  return (
    <div className="w-[200px] flex-shrink-0">
      {/* Image Container */}
      <div className="relative h-[200px] rounded-lg overflow-hidden">
        {!imageError && product.image ? (
          <Image
            src={getImageUrl(product.image)}
            alt={`${product.name} - Ora Living Product`}
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="200px"
            quality={75}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        )}
        
        {/* Price inside image */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-bold text-white">₹{product.salePrice}</span>
        </div>
      </div>

      {/* Product name - below image */}
      <div className="mt-3 px-1">
        <h3 className="text-[16px] font-bold text-gray-900 line-clamp-1">{product.name}</h3>
      </div>

      {/* Button section */}
      <div className="mt-4">
        {quantity === 0 ? (
          <button 
            onClick={handleAdd}
            className="w-full h-[44px] text-[13px] font-medium rounded transition-all active:scale-95"
            style={{
              backgroundColor: categoryColor.bg,
              color: categoryColor.text,
              border: `2px solid ${categoryColor.border}`
            }}
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center justify-between rounded h-[44px]" style={{ backgroundColor: categoryColor.bg, border: `2px solid ${categoryColor.border}` }}>
            <button 
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 rounded-l"
              style={{ color: categoryColor.text }}
            >
              <FiMinus size={14} />
            </button>
            <span className="text-[13px] font-medium" style={{ color: categoryColor.text }}>{quantity}</span>
            <button 
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 rounded-r"
              style={{ color: categoryColor.text }}
            >
              <FiPlus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
