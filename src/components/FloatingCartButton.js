"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "../context/OrderContext";
import { FiShoppingBag } from "react-icons/fi";

const FloatingCartButton = () => {
  const router = useRouter();
  const { cart } = useOrder();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <button 
      onClick={() => router.push("/cart")}
      className="fixed bottom-4 left-4 right-4 bg-[#FC8019] text-white rounded-lg shadow-lg z-50"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FiShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-white text-[#FC8019] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
          <span className="font-medium text-[14px]">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-[14px]">₹{totalAmount}</span>
          <span className="text-[13px]">• View Cart</span>
        </div>
      </div>
    </button>
  );
};

export default FloatingCartButton;
