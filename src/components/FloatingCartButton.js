"use client";
import React from "react";

const FloatingCartButton = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md border-t">
      <div className="flex items-center justify-between p-4">
        <div className="text-sm">
          <p>
            Shop for <span className="font-bold">₹414 more</span> to unlock{" "}
            <span className="font-bold text-green-600">FREE DELIVERY</span>
          </p>
          <p className="text-green-500">₹15 saved, more coming up!</p>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md">
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default FloatingCartButton;
