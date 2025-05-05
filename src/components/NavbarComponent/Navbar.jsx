'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoGlobeOutline } from "react-icons/io5";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // You can adjust scroll threshold here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`w-[85%] mx-auto flex justify-between items-center py-4 px-4 md:px-8 sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black text-white shadow-lg rounded-xl w-[98%] mx-auto' : ''
      }`}>
        <Link href="/">
          <Image src='/images/Images/NavlogoPolicy.png' alt="logo" width={195} height={40} />
        </Link>

        <div className="md:flex space-x-10">
          <Link href="/services" className="hover:text-gray-400">Services</Link>
          <Link href="/courses" className="hover:text-gray-400">Courses</Link>
          <Link href="/aboutus" className="hover:text-gray-400">About Us</Link>
          <Link href="/blogs" className="hover:text-gray-400">Blogs</Link>
          <Link href="/contactus" className="hover:text-gray-400">Contact Us</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 gap-2">
          <div className="flex items-center">
            <IoGlobeOutline className="w-5 h-5 me-1" />En
          </div>
          <Link href='/contactus' >
            <button className="border px-4 py-1 rounded-md hover:bg-white hover:text-black" >
              Get a Quote
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
