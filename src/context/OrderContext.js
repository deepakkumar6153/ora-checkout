"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { readProductsFromSheet, submitOrderToSheet } from "@/services/sheetsService";

const OrderContext = createContext();

const STORAGE_KEY = "ora_cart";

export const OrderProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['all']); // Initialize with 'all'
  const [customer, setCustomer] = useState({ name: "", phone: "", notes: "" });
  const [location, setLocation] = useState("");
  const [salesId, setSalesId] = useState("");

  // Function to extract unique categories from products
  const extractCategories = (products) => {
    const uniqueCategories = new Set(['all']);
    products.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    return Array.from(uniqueCategories);
  };

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await readProductsFromSheet();
        console.log('Fetched products with unique keys:', fetchedProducts);
        setProducts(fetchedProducts || []);
        // Update categories based on fetched products
        setCategories(extractCategories(fetchedProducts));
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage on first load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      const savedCustomer = localStorage.getItem("ora_customer");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure cart items have unique keys
        const cartWithUniqueKeys = parsedCart.map(item => ({
          ...item,
          id: item.uniqueKey || item.id // Use uniqueKey if available, fallback to id
        }));
        setCart(cartWithUniqueKeys);
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
      throw new Error('Cart is empty');
    }

    // Calculate total negotiated amount
    const totalNegotiatedAmount = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

    // Prepare entries with camelCase keys
    return cart.map(item => ({
      location: location || "",
      salesId: salesId || "",
      productName: item.name || "",
      quantity: item.quantity || 0,
      productSalePrice: item.salePrice || 0,
      productMinPrice: item.minSalePrice || 0,
      productFinalPrice: item.finalPrice || 0,
      totalCartPrice: totalNegotiatedAmount || 0,
      customerName: customer.name || "",
      customerPhone: customer.phone || "",
      notes: customer.notes || ""
    }));
  };

  const submitOrder = async () => {
    try {
      const orderData = prepareOrderData();
      const success = await submitOrderToSheet(orderData);
      
      // Reset order after successful submission
      if (success) {
        resetOrder();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  };

  const updateNegotiatedAmount = (negotiatedAmount) => {
    // Calculate final prices for each product based on negotiated amount
    const updatedCart = calculateFinalPrices(cart, negotiatedAmount);
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    console.log('Adding product to cart:', product);
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
        finalPrice: product.salePrice, // Initialize finalPrice with salePrice
        uniqueKey: product.uniqueKey || product.id // Preserve uniqueKey
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
    // Clear cart
    setCart([]);
    // Clear customer details
    setCustomer({ name: "", phone: "", notes: "" });
    // Reset search and category
    setSearchQuery("");
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("ora_customer");
    // Keep location and salesId as they might be needed for next order
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
    products,
    cart,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    categories,
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
    prepareOrderData,
    setSelectedCategory,
    setSearchQuery,
    submitOrder
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
