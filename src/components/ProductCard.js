"use client";
import React from "react";

const ProductCard = ({ name, price, originalPrice, discount }) => {
  return (
    <div className="w-44 p-2 rounded-lg shadow-md bg-white relative">
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
        {discount}% OFF
      </div>

      {/* Product Image Placeholder */}
      <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center mb-2">
        <span className="text-sm text-gray-500">Image</span>
      </div>

      {/* Product Info */}
      <div className="text-sm">
        <p className="font-medium truncate">{name}</p>
        <p className="text-xs text-gray-500">54 g</p>
        <div className="flex items-center space-x-2 mt-1">
          <p className="text-green-600 font-semibold">₹{price}</p>
          <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>
        </div>
      </div>

      {/* Add Button */}
      <button className="mt-2 w-full border border-green-500 text-green-500 text-sm py-1 rounded-md hover:bg-green-500 hover:text-white">
        ADD
      </button>
    </div>
  );
};

export default ProductCard;
