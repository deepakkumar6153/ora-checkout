"use client";
import React from "react";
import { useOrder } from '../context/OrderContext';
import { CATEGORY_COLORS } from '@/constants/colors';

const CategoryScroll = () => {
  const { selectedCategory, setSelectedCategory, categories } = useOrder();

  // Function to get color for a category
  const getCategoryColor = (category) => {
    const index = categories.indexOf(category) % CATEGORY_COLORS.length;
    return CATEGORY_COLORS[index];
  };

  return (
    <div className="sticky top-14 bg-white z-40 border-b border-gray-100">
      <div className="flex overflow-x-auto hide-scrollbar px-8 py-3 gap-3">
        {categories.map((category) => {
          const color = getCategoryColor(category);
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-2xl text-[13px] font-medium
                transition-colors duration-200
                ${isSelected 
                  ? `bg-[${color.bg}] text-[${color.text}]` 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
              style={{
                backgroundColor: isSelected ? color.bg : undefined,
                color: isSelected ? color.text : undefined
              }}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryScroll;
