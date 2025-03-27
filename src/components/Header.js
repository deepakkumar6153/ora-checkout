"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';
import { useMenu } from '@/context/MenuContext';
import Image from 'next/image';

const Header = ({ showBackButton = false }) => {
  const router = useRouter();
  const { openMenu } = useMenu();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white z-50 flex items-center justify-between px-4 border-b border-gray-100">
      <div className="w-8 flex items-center">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} className="text-gray-800" />
          </button>
        )}
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2">
        ORA LIVING
      </div>

      <button 
        onClick={openMenu}
        className="p-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center"
        aria-label="Open menu"
      >
        <FiMenu size={20} className="text-gray-800" />
      </button>
    </header>
  );
};

export default Header; 