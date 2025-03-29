"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import Menu from "@/components/Menu";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { CATEGORY_COLORS } from "@/constants/colors";

const PRICE_THRESHOLD_PERCENTAGE = 20;

// Default color for fallback
const DEFAULT_CATEGORY_COLOR = {
  bg: '#F7F7F7',
  text: '#666666',
  border: '#E5E7EB'
};

const CartPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, updateItemFinalPrice, updateNegotiatedAmount, location, salesId, categories } = useOrder();
  const [negotiatedAmount, setNegotiatedAmount] = useState("");

  // Function to get color for a category
  const getCategoryColor = (category) => {
    if (!category || !categories.includes(category)) {
      return DEFAULT_CATEGORY_COLOR;
    }
    const index = categories.indexOf(category) % CATEGORY_COLORS.length;
    return CATEGORY_COLORS[index];
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

  // Calculate totals
  const totalSaleAmount = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  const totalMinimumAmount = cart.reduce((sum, item) => sum + (item.minSalePrice * item.quantity), 0);
  const totalFinalAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

  // Calculate price difference
  const priceDifference = totalFinalAmount - totalSaleAmount;
  
  // Determine if price is too high or low
  const getPriceValidationMessage = () => {
    const priceDiffPercentage = (priceDifference / totalSaleAmount) * 100;
    if (priceDiffPercentage > PRICE_THRESHOLD_PERCENTAGE) {
      return `Paid price is ₹${Math.abs(priceDifference).toFixed(2)} higher than original price`;
    } else if (priceDiffPercentage < -PRICE_THRESHOLD_PERCENTAGE) {
      return `Paid price is ₹${Math.abs(priceDifference).toFixed(2)} lower than original price`;
    }
    return null;
  };

  // Set initial negotiated amount to total sale amount
  useEffect(() => {
    setNegotiatedAmount(totalSaleAmount.toString());
  }, [totalSaleAmount]);

  const handleNegotiatedAmountChange = (e) => {
    const value = e.target.value;
    setNegotiatedAmount(value);
    
    // Only update cart if we have a valid number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateNegotiatedAmount(numValue);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Menu />
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Menu />
      <div className="pt-14 pb-32">
        <div className="max-w-[480px] mx-auto px-4">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => {
              const categoryColor = getCategoryColor(item.category);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg"
                  style={{ backgroundColor: `${categoryColor.bg}20` }}
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[15px] font-medium" style={{ color: categoryColor.text }}>
                        ₹{item.salePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md hover:bg-gray-50 active:scale-95 transition-all"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={18} />
                      </button>
                      <span className="text-[15px] font-medium min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md hover:bg-gray-50 active:scale-95 transition-all"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bill Details */}
          <div className="mt-6 space-y-4">
            <h2 className="text-[17px] font-medium">Bill Details</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[15px]">
                <span>Total Sale Amount</span>
                <span>₹{totalSaleAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span>Minimum Amount</span>
                <span>₹{totalMinimumAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={negotiatedAmount}
                  onChange={handleNegotiatedAmountChange}
                  className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
                />
                <p className="mt-1 text-[13px] text-gray-500">
                  Enter the final amount
                </p>
                {getPriceValidationMessage() && (
                  <p className="text-[15px] text-red-500 mt-2">
                    {getPriceValidationMessage().split('₹').map((part, index) => (
                      index === 1 ? (
                        <span key={index} className="font-bold">₹{part}</span>
                      ) : (
                        part
                      )
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="fixed bottom-4 right-4 left-4">
            <button
              onClick={() => router.push("/details")}
              className="w-full bg-[#FC8019] text-white py-3 rounded-lg font-medium shadow-lg hover:bg-[#e67316] active:scale-95 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
