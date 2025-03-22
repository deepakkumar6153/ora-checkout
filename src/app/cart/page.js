"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, addToCart, resetOrder } = useOrder();

  const totalPrice = cart.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between mt-0">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
        <button onClick={() => router.back()} className="text-sm text-gray-600">
          ← Back
        </button>
        <h1 className="text-xl font-bold">Your Cart</h1>
        <button
          onClick={resetOrder}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Reset Order
        </button>
      </header>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-2 shadow-sm rounded-md"
            >
              <div>
                <h2 className="text-sm font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-xs">₹{item.salePrice}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item)}
                  className="px-3 py-1 border border-green-600 text-green-600 rounded-md"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 border border-green-600 text-green-600 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-2 flex justify-between items-center fixed bottom-0 w-full">
        <button
          onClick={() => router.push("/details")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Proceed to Details
        </button>
      </footer>
    </div>
  );
};

export default CartPage;
