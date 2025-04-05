"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useMenu } from "@/context/MenuContext";
import { FiX, FiRefreshCcw, FiArrowLeft, FiChevronDown, FiChevronUp, FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ORA_LIVING_PAYMENT_QR_CODE, ORA_LIVING_INSTAGRAM_QR_CODE } from '@/constants/config';
import { readProductsFromSheet } from "@/services/sheetsService";

const Menu = () => {
  const { isOpen, closeMenu } = useMenu();
  const { location, setLocation, salesId, setSalesId, resetOrder, setProducts } = useOrder();
  const [isSalesInfoOpen, setIsSalesInfoOpen] = useState(false);
  const [isRefreshOpen, setIsRefreshOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('payment');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = pathname === '/cart' || pathname.startsWith('/details/');

  if (!isOpen) return null;

  const handleReset = () => {
    resetOrder();
    router.push("/");
    closeMenu();
  };

  const handleRefreshProducts = async () => {
    try {
      setIsRefreshing(true);
      const freshProducts = await readProductsFromSheet(true);
      setProducts(freshProducts);
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already a complete URL, return as is
    if (url.startsWith('https://')) return url;
    // If it's a Google Drive ID, construct the proper URL
    if (url.includes('drive.google.com')) {
      const fileId = url.split('id=')[1];
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="fixed top-0 left-0 right-0 h-14 bg-white z-50 flex items-center justify-between px-4">
          <div className="w-8">
            {showBackButton ? (
              <button
                onClick={() => router.back()}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                aria-label="Go back"
              >
                <FiArrowLeft size={20} />
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                aria-label="Open menu"
              >
                <FiMenu size={20} />
              </button>
            )}
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            ORA LIVING
          </div>

          <button 
            onClick={closeMenu}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>
      </header>

      <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />
      <div className="fixed inset-y-0 right-0 w-full bg-white shadow-xl z-[100] overflow-y-auto">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={closeMenu}
            className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center"
            aria-label="Close menu"
          >
            <FiX size={20} className="text-gray-800" />
          </button>
        </div>

        <div className="pt-2 px-4 pb-4">
          <div className="mt-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => setIsSalesInfoOpen(!isSalesInfoOpen)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
            >
              <span className="font-medium text-gray-800">Sales Information</span>
              {isSalesInfoOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {isSalesInfoOpen && (
              <div className="p-4 border-t">
                <div className="mb-4">
                  <label className="block text-[13px] text-gray-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border rounded-lg text-[15px] focus:outline-none focus:border-[#FC8019]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-600 mb-1">
                    Sales ID
                  </label>
                  <input
                    type="text"
                    value={salesId}
                    onChange={(e) => setSalesId(e.target.value)}
                    placeholder="Enter sales ID"
                    className="w-full px-3 py-2 border rounded-lg text-[15px] focus:outline-none focus:border-[#FC8019]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => setIsRefreshOpen(!isRefreshOpen)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
            >
              <span className="font-medium text-gray-800">Refresh Product List</span>
              {isRefreshOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {isRefreshOpen && (
              

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleRefreshProducts}
                  disabled={isRefreshing}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FC8019] text-white rounded-lg font-medium hover:bg-[#e67316] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiRefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh Products'}</span>
                </button>
              </div>
              
            )}
          </div>

          <div className="mt-6 p-4 border rounded-lg">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'payment'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Payment
              </button>
              <button
                onClick={() => setActiveTab('insta')}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'insta'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Insta
              </button>
            </div>
            <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
              {activeTab === 'payment' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={ORA_LIVING_PAYMENT_QR_CODE}
                    alt="Ora Living Payment QR Code - Scan to make payment"
                    fill
                    className="object-contain rounded-lg"
                    sizes="100vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={ORA_LIVING_INSTAGRAM_QR_CODE}
                    alt="Ora Living Instagram QR Code - Scan to follow us"
                    fill
                    className="object-contain rounded-lg"
                    sizes="100vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FC8019] text-white rounded-lg font-medium hover:bg-[#e67316]"
            >
              <FiArrowLeft size={18} />
              <span>Reset Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;