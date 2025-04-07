'use client'
import React, { useState } from 'react'
import { IoGlobeOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const Navbar = ({ heading, para }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center py-4 px-4 md:px-8">
        <div className="text-black px-2 py-1 rounded-md flex items-center">
          <img src='/images/Images/QcsLogo.png' alt="logo" width={57} height={40} />
          <h1 className="text-[#FFFFFF] text-base font-semibold leading-tight ms-2">
            Quantam Crafters<br /> Studio
          </h1>
        </div>

        
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="hover:text-gray-400">Services</Link>
          <Link href="#" className="hover:text-gray-400">Projects</Link>
          <Link href="#" className="hover:text-gray-400">About Us</Link>
          <Link href="#" className="hover:text-gray-400">Blogs</Link>
          <Link href="#" className="hover:text-gray-400">Contact Us</Link>
        </div>

        
        <div className="flex items-center md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX className="text-white w-6 h-6" /> : <HiMenu className="text-white w-6 h-6" />}
          </button>
        </div>

        
        <div className="hidden md:flex items-center space-x-4 gap-2">
          <div className="flex items-center text-white">
            <IoGlobeOutline className="w-5 h-5 me-1" />En
          </div>
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      </nav>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black py-4 space-y-4 text-white">
          <Link href="#">Services</Link>
          <Link href="#">Projects</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Blogs</Link>
          <Link href="#">Contact Us</Link>
          <div className="flex items-center">
            <IoGlobeOutline className="w-5 h-5 me-1" /> En
          </div>
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      )}

      <div className="text-center py-4 px-5 mt-24 md:mt-36">
        <h1 className="text-4xl md:text-5xl font-bold">{heading}</h1>
        <p className="text-[#FFFFFF] mt-4 max-w-xl mx-auto">{para}</p>
      </div>
    </>
  );
};

export default Navbar;
