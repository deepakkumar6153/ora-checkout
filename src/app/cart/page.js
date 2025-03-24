"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, updateItemFinalPrice, updateNegotiatedAmount, location, salesId } = useOrder();
  const [negotiatedAmount, setNegotiatedAmount] = useState("");

  // Calculate totals
  const totalSaleAmount = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  const totalMinimumAmount = cart.reduce((sum, item) => sum + (item.minSalePrice * item.quantity), 0);
  const totalFinalAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

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
        <Header showBack title="Cart" />
        <Menu />
        <div className="pt-14">
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showBack title="Cart" />
      <Menu />
      <div className="pt-14 pb-32">
        <div className="max-w-[480px] mx-auto px-4">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[15px] font-medium">₹{item.salePrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="text-[13px] font-medium min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#FC8019] border border-gray-200 rounded-md"
                  >
                    <FiPlus size={14} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-gray-100 rounded-full ml-2"
                  >
                    <FiTrash2 size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
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
                <label className="block text-[13px] text-gray-500 mb-2">
                  Negotiated Amount
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={negotiatedAmount}
                  onChange={handleNegotiatedAmountChange}
                  className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
                />
                <p className="mt-1 text-[13px] text-gray-500">
                  Enter the final negotiated amount
                </p>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="fixed bottom-4 right-4 left-4">
            <button
              onClick={() => router.push("/details")}
              className="w-full bg-[#FC8019] text-white py-3 rounded-lg font-medium shadow-lg"
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
