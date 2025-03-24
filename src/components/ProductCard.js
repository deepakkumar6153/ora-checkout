"use client";
import React from "react";
import { useOrder } from "../context/OrderContext";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductCard = ({ product, isHorizontal = false }) => {
  const { cart, addToCart, updateQuantity } = useOrder();
  const itemInCart = cart.find(item => item.id === product.id);
  const quantity = itemInCart?.quantity || 0;

  const handleAdd = () => {
    console.log("Adding product to cart:", product); // Debug log
    addToCart({
      ...product,
      finalPrice: product.salePrice || product.price // Fallback to price if salePrice is not available
    });
  };

  if (isHorizontal) {
    return (
      <div className="relative bg-white rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">Image</span>
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
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[100px] h-[100px] object-cover rounded-lg"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-400">Image</span>
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
