"use client";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

const QRDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("payment");

  return (
    <>
      {/* Drawer Trigger */}
      <button
        onClick={() => onClose(!isOpen)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-l-lg p-2 transition-transform ${
          isOpen ? "translate-x-[400px]" : ""
        }`}
      >
        <FiChevronLeft size={24} className={`text-gray-700 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("payment")}
            className={`flex-1 px-4 py-3 text-[15px] font-medium ${
              activeTab === "payment"
                ? "text-[#FC8019] border-b-2 border-[#FC8019]"
                : "text-gray-500"
            }`}
          >
            Payment QR
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`flex-1 px-4 py-3 text-[15px] font-medium ${
              activeTab === "other"
                ? "text-[#FC8019] border-b-2 border-[#FC8019]"
                : "text-gray-500"
            }`}
          >
            Other QR
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "payment" ? (
            <div className="space-y-4">
              <h3 className="text-[17px] font-medium text-gray-800">
                Scan to Pay
              </h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://placehold.co/400x400/e2e8f0/1e293b?text=Payment+QR"
                  alt="Payment QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[13px] text-gray-500 text-center">
                Scan this QR code to make payment
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-[17px] font-medium text-gray-800">
                Other QR Code
              </h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://placehold.co/400x400/e2e8f0/1e293b?text=Other+QR"
                  alt="Other QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[13px] text-gray-500 text-center">
                Scan this QR code for additional information
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRDrawer; 