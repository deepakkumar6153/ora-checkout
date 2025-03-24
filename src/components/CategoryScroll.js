"use client";
import React, { useState } from "react";

const categories = ["All", "Bedsheets", "Towels", "Quilts", "Table Covers", "Bathrobes", "Cushions"];

const CategoryScroll = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="sticky top-14 bg-white z-40 border-b border-gray-100">
      <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`
              whitespace-nowrap px-3 py-1 rounded-2xl text-[13px] font-medium
              ${activeCategory === category 
                ? 'bg-[#fceee3] text-[#FC8019]' 
                : 'bg-gray-100 text-gray-700'}
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryScroll;
