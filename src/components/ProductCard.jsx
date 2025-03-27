import React from 'react';
import Image from 'next/image';
import { useOrder } from '@/context/OrderContext';

const ProductCard = ({ product, isHorizontal = false }) => {
  const { cart, addToCart, updateQuantity } = useOrder();
  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!cartItem) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(product.id, newQuantity);
  };

  // Calculate discount percentage based on salePrice and price
  const discountPercentage = product.price > product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className={`bg-white rounded-lg p-2 ${isHorizontal ? 'w-full' : 'w-full'} relative`}>
      {/* Discount Tag */}
      {discountPercentage > 0 && (
        <div className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded absolute top-3 left-3 z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={product.image || '/images/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain p-1"
          sizes="(max-width: 768px) 32vw, 220px"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        <h3 className="text-[14px] font-medium text-gray-800 line-clamp-2 min-h-[36px]">
          {product.name}
        </h3>
        <p className="text-[12px] text-gray-500">
          {product.weight || product.size}
        </p>
        
        {/* Price Section */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold text-gray-900">
              ₹{product.salePrice?.toFixed(2)}
            </span>
            {product.price > product.salePrice && (
              <span className="text-[13px] text-gray-400 line-through">
                ₹{product.price?.toFixed(2)}
              </span>
            )}
          </div>
          {product.price > product.salePrice && (
            <span className="text-[11px] text-green-600 font-medium">
              Save ₹{(product.price - product.salePrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Add/Update Cart Button */}
      <div className="mt-2">
        {!cartItem ? (
          <button
            onClick={handleAddToCart}
            className="w-full py-1.5 px-2 text-[13px] font-medium text-[#FC8019] border border-[#FC8019] rounded"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center justify-between bg-white border border-[#FC8019] rounded">
            <button
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              className="px-3 py-1 text-[#FC8019] text-[14px] font-medium"
            >
              -
            </button>
            <span className="text-[13px] font-medium text-[#FC8019]">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              className="px-3 py-1 text-[#FC8019] text-[14px] font-medium"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 