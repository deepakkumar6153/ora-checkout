"use client";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 px-8 py-4">
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ora Living. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 