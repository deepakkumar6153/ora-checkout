"use client";
import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [location, setLocation] = useState("");

  // Load location from localStorage on first load
  useEffect(() => {
    const savedLocation = localStorage.getItem("salesLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  // Save location to localStorage whenever changed
  useEffect(() => {
    if (location) {
      localStorage.setItem("salesLocation", location);
    }
  }, [location]);

  // Load cart from localStorage on app load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct?.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // Reset order function
  const resetOrder = () => {
    setCart([]); // Clear cart
    setCustomer({ name: "", phone: "" }); // Clear customer info
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        customer,
        addToCart,
        removeFromCart,
        resetOrder,
        setCustomer,
        location,
        setLocation,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
