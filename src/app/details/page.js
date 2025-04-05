"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { submitOrderToSheet } from "@/services/sheetsService";
import Menu from "@/components/Menu";

const PRICE_THRESHOLD_PERCENTAGE = 20;

const DetailsPage = () => {
  const router = useRouter();
  const { cart, resetOrder, prepareOrderData, customer, updateCustomer, location, salesId } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total using finalPrice (negotiated price)
  const totalAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  
  // Calculate original total for comparison
  const originalTotal = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  
  // Calculate price difference
  const priceDifference = totalAmount - originalTotal;
  
  // Determine if price is too high or low
  const getPriceValidationMessage = () => {
    const priceDiffPercentage = (priceDifference / originalTotal) * 100;
    if (priceDiffPercentage > PRICE_THRESHOLD_PERCENTAGE) {
      return `Paid price is ₹${Math.abs(priceDifference).toFixed(2)} higher than original price`;
    } else if (priceDiffPercentage < -PRICE_THRESHOLD_PERCENTAGE) {
      return `Paid price is ₹${Math.abs(priceDifference).toFixed(2)} lower than original price`;
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCustomer({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      const orderData = prepareOrderData();
      const success = await submitOrderToSheet(orderData);
      
      if (success) {
        // Reset order and redirect to home
        resetOrder();
        router.push("/");
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Menu />
      <div className="pt-14 pb-32">
        <div className="max-w-[480px] mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h2 className="text-[17px] font-medium">Customer Details (Optional)</h2>
              
              
              <div>
                <label className="block text-[13px] text-gray-500 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone || ""}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  inputMode="numeric"
                  maxLength="10"
                  className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-500 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={customer.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter customer name"
                  className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-500 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={customer.notes || ""}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes"
                  rows="3"
                  className="w-full p-3 text-[15px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#FC8019]"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3">
              <h2 className="text-[17px] font-medium text-gray-800">Order Summary</h2>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-[15px]">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.salePrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-[17px] font-medium">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
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

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#FC8019] text-white py-3 rounded-lg font-medium shadow-lg transition-all ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#e67316] active:scale-95'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
