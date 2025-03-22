"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";

const DetailsPage = () => {
  const router = useRouter();
  const { setCustomer, customer, resetOrder } = useOrder();
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);

  const handleSave = () => {
    setCustomer({ name, phone });
    router.push("/cart");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between mt-0">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
        <button onClick={() => router.back()} className="text-sm text-gray-600">
          ← Back
        </button>
        <h1 className="text-xl font-bold">Add Customer Details</h1>
        <button
          onClick={resetOrder}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Reset Order
        </button>
      </header>

      <div className="p-4">
        <input
          type="text"
          placeholder="Enter customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="Enter 10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-2 flex justify-end items-center fixed bottom-0 w-full">
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Save Details
        </button>
      </footer>
    </div>
  );
};

export default DetailsPage;
