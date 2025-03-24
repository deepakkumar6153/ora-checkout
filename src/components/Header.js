"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiMenu, FiSearch } from 'react-icons/fi';
import { useMenu } from '@/context/MenuContext';
import { ORA_LIVING_LOGO_SHOPIFY } from '@/constants/config';

const Header = ({ showBack = false, title = "Ora", onSearchClick }) => {
  const router = useRouter();
  const { openMenu } = useMenu();

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 z-40">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full mr-2"
            >
              <FiArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-[17px] font-medium text-gray-800">{title}</h1>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src={ORA_LIVING_LOGO_SHOPIFY}
            alt="Ora Living"
            className="h-8 object-contain"
          />
        </div>

        <button
          onClick={openMenu}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FiMenu size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header; 