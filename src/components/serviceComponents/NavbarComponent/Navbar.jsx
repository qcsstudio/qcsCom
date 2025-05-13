'use client'
import React, { useState } from 'react'
import { IoGlobeOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from 'next/image';
import { Syne,Unbounded } from "next/font/google";


const syne = Syne({ subsets: ["latin"], weight: "400" });
const unbounded = Unbounded({subsets: ['latin'],weight: '700'})

const Navbar = ({ heading, para }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center py-4 px-4 md:px-8">
        <Link href="/">
          <Image src='/images/Images/NavLogo.png' alt="logo" width={194.82} height={40} />
        </Link>

        <div className={`hidden md:flex space-x-11 text-[17px] ${syne.className}`}>
          <Link href="/services" className="hover:text-gray-400">Services</Link>
          <Link href="/courses" className="hover:text-gray-400">Courses</Link>
          <Link href="/aboutus" className="hover:text-gray-400">About Us</Link>
          <Link href="/blogs" className="hover:text-gray-400">Blogs</Link>
          <Link href="/contactus" className="hover:text-gray-400">Contact Us</Link>
        </div>


        <div className="flex items-center md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX className="text-white w-6 h-6" /> : <HiMenu className="text-white w-6 h-6" />}
          </button>
        </div>


        <div className={`hidden md:flex items-center space-x-4 gap-2 ${syne.className}`}>
          <div className="flex items-center text-white">
            <IoGlobeOutline className="w-5 h-5 me-1" />En
          </div>
          <Link href='/contactus' >
            <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black" >
              Get a Quote
            </button>
          </Link>
        </div>
      </nav>


      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black py-4 space-y-4 text-white">
          <Link href="/services">Services</Link>
          <Link href="/courses">Projects</Link>
          <Link href="services/#aboutus">About Us</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/services/#contactus">Contact Us</Link>
          <div className="flex items-center">
            <IoGlobeOutline className="w-5 h-5 me-1" /> En
          </div>
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      )}

      <div className={`text-center py-1 md:py-4 px-5  mt-10 sm:mt-24 md:mt-15  `}>
        <h1 className={`text-2xl md:text-[61px] font-black ${unbounded.className}`}>{heading}</h1>
        <p className={`text-[#FFFFFF] text-sm md:text-2xl mt-4 max-w-4xl mx-auto ${syne.className}`}>{para}</p>
      </div>
    </>
  );
};

export default Navbar;
