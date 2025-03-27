"use client";
import React, { useState } from 'react';
import { useOrder } from "../context/OrderContext";
import { FiMinus, FiPlus } from "react-icons/fi";
import Image from "next/image";

const ProductCard = ({ product, isHorizontal = false }) => {
  const { cart, addToCart, updateQuantity } = useOrder();
  const itemInCart = cart.find(item => item.id === product.id);
  const quantity = itemInCart?.quantity || 0;
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    console.log("Adding product to cart:", product); // Debug log
    addToCart({
      ...product,
      finalPrice: product.salePrice || product.price // Fallback to price if salePrice is not available
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isHorizontal) {
    return (
      <div className="relative bg-white rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          {!imageError ? (
            <Image
              src={product.image}
              alt="ora living centered text"
              fill
              className="object-cover"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Image not available</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2">
          <h3 className="text-[13px] font-medium text-gray-800 line-clamp-2">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[15px] font-medium">₹{product.salePrice || product.price}</span>
          </div>

          {/* Add/Quantity Button */}
          <div className="mt-2">
            {quantity === 0 ? (
              <button 
                onClick={handleAdd}
                className="w-full py-1 text-[#FC8019] border border-gray-200 rounded text-[12px] font-medium bg-white"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[12px] font-medium">{quantity}</span>
                <button 
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Original vertical layout
  return (
    <div className="flex justify-between items-start p-4 border-b border-gray-100">
      <div className="flex-1 pr-4">
        <h3 className="text-[15px] font-medium text-gray-800">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[15px] font-medium">₹{product.salePrice || product.price}</span>
        </div>
        
        <p className="text-[13px] text-gray-500 mt-2">
          Delivery in 15 mins
        </p>
      </div>

      <div className="flex flex-col items-end">
        {/* Product Image */}
        <div className="relative">
          {!imageError ? (
            <Image
              src={product.image}
              alt="ora living centered text"
              width={200}
              height={200}
              className="w-[100px] h-[100px] object-cover rounded-lg"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Image not available</span>
            </div>
          )}
        </div>

        {/* Add/Quantity Button */}
        <div className="mt-2">
          {quantity === 0 ? (
            <button 
              onClick={handleAdd}
              className="px-6 py-1 text-[#FC8019] border border-gray-200 rounded text-[13px] font-medium bg-white"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-7 h-7 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md"
              >
                <FiMinus size={14} />
              </button>
              <span className="text-[13px] font-medium min-w-[20px] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
