"use client";
import React from "react";

const categories = ["Quilts", "Bedsheets", "Cushions", "Bathrobes", "Towels"];

const CategoryScroll = () => {
  return (
    <div className="flex space-x-3 overflow-x-scroll hide-scrollbar p-4 bg-white">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 text-sm border rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryScroll;
