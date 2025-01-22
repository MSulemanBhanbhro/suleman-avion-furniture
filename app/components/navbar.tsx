'use client';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosContact } from 'react-icons/io';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useWishlist } from '../context/WishlistContext';
import { RootState } from '../redux/store';

const NavbarClient = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="p-4 w-full h-auto sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center py-2">
        {/* Search Icon (Desktop) */}
        <button aria-label="Search" className="hidden md:block">
          <CiSearch size={25} className="text-[#2A254B]" />
        </button>

        {/* Brand Name */}
        <h1 className="text-[#2A254B] text-xl md:text-2xl md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          Avion
        </h1>

        {/* Icons Section (Desktop) */}
        <div className="hidden md:flex gap-4 items-center relative">
          {/* Wishlist */}
          <Link href="/wishlist" className="relative" aria-label="Wishlist">
            <span className='absolute -top-1 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
              {wishlist.length}
            </span>
            <span role="img" aria-label="wishlist">❤️</span>
          </Link>

          {/* Cart */}
          <Link href="/shopping" className="relative" aria-label="Cart">
            <span className='absolute -top-1 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
              {cartItems.length}
            </span>
            <IoCartOutline size={25} className="text-[#2A254B]" />
          </Link>

          {/* Contact Icon */}
          <IoIosContact size={25} className="text-[#2A254B] cursor-pointer" aria-label="Profile" />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <button aria-label="Search">
            <CiSearch size={25} className="text-[#2A254B]" />
          </button>

          {/* Wishlist (Mobile) */}
          <Link href="/wishlist" className="relative" aria-label="Wishlist">
            <span className='absolute top-2 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
              {wishlist.length}
            </span>
            <span role="img" aria-label="wishlist">❤️</span>
          </Link>

          {/* Cart (Mobile) */}
          <Link href="/shopping" className="relative" aria-label="Cart">
            <span className='absolute top-2 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5 text-white'>
              {cartItems.length}
            </span>
            <IoCartOutline size={25} className="text-[#2A254B]" />
          </Link>

          <IoIosContact size={25} className="text-[#2A254B] cursor-pointer" aria-label="Profile" />
          
          {/* Toggle Menu Button */}
          <button className="text-2xl focus:outline-none z-30" onClick={toggleMenu} aria-label="Toggle Menu">
            {!menuOpen ? <IoMenu /> : <IoClose />}
          </button>
        </div>
      </div>

      <hr />

      {/* Mobile Navigation */}
      <div className={`fixed top-0 right-0 py-6 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:w-auto md:translate-x-0 md:bg-transparent md:shadow-none z-20`}>
        {/* Close button only renders when menu is open */}
        {menuOpen && (
          <button className="text-2xl focus:outline-none absolute top-4 right-4" onClick={toggleMenu} aria-label="Close Menu">
            <IoClose />
          </button>
        )}

        <ul className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 md:gap-8 text-[#726E8D] text-base p-6 md:p-0">
          {['plant-pots', 'ceramics', 'tables', 'chairs', 'crockery', 'tableware', 'cutlery'].map((item) => (
            <li key={item}>
              <Link href={`/category/${item}`} className="hover:underline">{item.replace('-', ' ')}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarClient;
