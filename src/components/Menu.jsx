"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useMenu } from "@/context/MenuContext";
import { FiX, FiRefreshCcw } from "react-icons/fi";

const Menu = () => {
  const { isOpen, closeMenu } = useMenu();
  const { location, setLocation, salesId, setSalesId, resetOrder } = useOrder();
  const [activeTab, setActiveTab] = useState("payment");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <h1 className="text-[17px] font-medium">Menu</h1>
        <button
          onClick={closeMenu}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FiX size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-14 h-full overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Sales Info */}
          <div className="space-y-4">
            <h2 className="text-[17px] font-medium">Sales Info</h2>
            
            <div>
              <label className="block text-[13px] text-gray-500 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location || ""}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
              />
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-2">
                Sales ID
              </label>
              <input
                type="text"
                value={salesId || ""}
                onChange={(e) => setSalesId(e.target.value)}
                placeholder="Enter sales ID"
                className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
              />
            </div>
          </div>

          {/* QR Code Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("payment")}
                className={`flex-1 py-2 text-[15px] ${
                  activeTab === "payment"
                    ? "text-[#FC8019] border-b-2 border-[#FC8019]"
                    : "text-gray-500"
                }`}
              >
                Payment QR
              </button>
              <button
                onClick={() => setActiveTab("instagram")}
                className={`flex-1 py-2 text-[15px] ${
                  activeTab === "instagram"
                    ? "text-[#FC8019] border-b-2 border-[#FC8019]"
                    : "text-gray-500"
                }`}
              >
                Instagram QR
              </button>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">QR Code Placeholder</p>
            </div>
          </div>

          {/* Reset Order Button */}
          <button
            onClick={() => {
              resetOrder();
              closeMenu();
            }}
            className="w-full py-3 text-[15px] text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Reset Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu; 