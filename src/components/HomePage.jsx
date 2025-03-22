"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import {
  ORA_LIVING_LOGO_SHOPIFY,
  SAMPLE_PRODUCT_IMAGE,
} from "@/constants/config";
import products from "@/constants/products";

const HomePage = () => {
  const router = useRouter();
  const { addToCart, removeFromCart, cart, resetOrder } = useOrder();

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
        <img
          src={ORA_LIVING_LOGO_SHOPIFY}
          alt="Ora Living Logo"
          className="h-10 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <button
          onClick={resetOrder}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Reset Order
        </button>
      </header>

      {/* Category Scroll */}
      <div className="flex overflow-x-scroll no-scrollbar p-2 space-x-3 bg-white shadow-sm">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="p-4 grid grid-cols-2 gap-4 mt-0">
        {filteredProducts.map((product) => {
          const productInCart = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={product.image || SAMPLE_PRODUCT_IMAGE}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-2">
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-xs">₹{product.salePrice}</p>
                {productInCart ? (
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => removeFromCart(product)}
                      className="px-3 py-1 border border-green-600 text-green-600 rounded-md"
                    >
                      -
                    </button>
                    <span className="text-sm">{productInCart.quantity}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-1 border border-green-600 text-green-600 rounded-md"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white w-full py-1 rounded-md mt-2"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-2 flex justify-between items-center fixed bottom-0 w-full">
        <button
          onClick={() => router.push("/details")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Details
        </button>
        <button
          onClick={() => router.push("/cart")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Go to Cart
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
