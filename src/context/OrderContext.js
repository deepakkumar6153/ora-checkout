"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { writeOrderToSheet } from "@/services/googleSheets";

const OrderContext = createContext();

const STORAGE_KEY = "ora_cart";

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "", notes: "" });
  const [location, setLocation] = useState("");
  const [salesId, setSalesId] = useState("");

  // Load cart and customer from localStorage on first load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      const savedCustomer = localStorage.getItem("ora_customer");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
      if (savedCustomer) {
        const parsedCustomer = JSON.parse(savedCustomer);
        setCustomer(parsedCustomer);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save cart and customer to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem("ora_customer", JSON.stringify(customer));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [cart, customer]);

  // Load location and salesId from localStorage on first load
  useEffect(() => {
    const savedLocation = localStorage.getItem("salesLocation");
    const savedSalesId = localStorage.getItem("salesId");
    if (savedLocation) {
      setLocation(savedLocation);
    }
    if (savedSalesId) {
      setSalesId(savedSalesId);
    }
  }, []);

  // Save location and salesId to localStorage whenever changed
  useEffect(() => {
    if (location) {
      localStorage.setItem("salesLocation", location);
    }
    if (salesId) {
      localStorage.setItem("salesId", salesId);
    }
  }, [location, salesId]);

  const calculateFinalPrices = (cart, negotiatedAmount) => {
    // Calculate total min price for the cart
    const totalMinPrice = cart.reduce((sum, item) => sum + (item.minSalePrice * item.quantity), 0);
    
    // Calculate difference between negotiated amount and total min price
    const difference = negotiatedAmount - totalMinPrice;
    
    // Calculate difference per product (evenly distributed)
    const differencePerProduct = difference / cart.length;
    
    // Update final prices for each product
    return cart.map(item => ({
      ...item,
      finalPrice: item.minSalePrice + differencePerProduct
    }));
  };

  const prepareOrderData = () => {
    if (!cart.length) {
      return [];
    }

    // Calculate total negotiated amount
    const totalNegotiatedAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

    // Calculate final prices for each product
    const cartWithFinalPrices = calculateFinalPrices(cart, totalNegotiatedAmount);

    // Prepare entries for Google Sheets
    return cartWithFinalPrices.map(item => ({
      location,
      salesId,
      productName: item.name,
      productSalePrice: item.salePrice,
      productMinPrice: item.minSalePrice,
      productFinalPrice: item.finalPrice,
      customerName: customer.name || "",
      customerPhone: customer.phone || "",
      notes: customer.notes || "",
      quantity: item.quantity,
      totalCartPrice: totalNegotiatedAmount,
      timestamp: new Date().toISOString()
    }));
  };

  const submitOrder = async () => {
    try {
      const orderData = prepareOrderData();
      await writeOrderToSheet(orderData);
      
      // Reset order after successful submission
      resetOrder();
      return true;
    } catch (error) {
      console.error('Error submitting order:', error);
      return false;
    }
  };

  const updateNegotiatedAmount = (negotiatedAmount) => {
    // Calculate final prices for each product based on negotiated amount
    const updatedCart = calculateFinalPrices(cart, negotiatedAmount);
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { 
        ...product, 
        quantity: 1,
        finalPrice: product.salePrice // Initialize finalPrice with salePrice
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const updateItemFinalPrice = (productId, newFinalPrice) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, finalPrice: newFinalPrice }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const resetOrder = () => {
    setCart([]);
    setCustomer({ name: "", phone: "", notes: "" });
    setLocation("");
    setSalesId("");
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("ora_customer");
    localStorage.removeItem("salesLocation");
    localStorage.removeItem("salesId");
  };

  const updateCustomer = (newCustomer) => {
    setCustomer(prevCustomer => {
      const updatedCustomer = { ...prevCustomer, ...newCustomer };
      // Save to localStorage immediately
      try {
        localStorage.setItem("ora_customer", JSON.stringify(updatedCustomer));
      } catch (error) {
        console.error("Error saving customer to localStorage:", error);
      }
      return updatedCustomer;
    });
  };

  const value = {
    cart,
    customer,
    setCustomer,
    location,
    salesId,
    setLocation,
    setSalesId,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemFinalPrice,
    clearCart,
    resetOrder,
    updateCustomer,
    updateNegotiatedAmount,
    prepareOrderData
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
