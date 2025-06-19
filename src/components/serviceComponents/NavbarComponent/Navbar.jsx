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
    {/* navbar */}

      <nav className="w-[90%] mx-auto flex justify-between items-center   py-4 ">
        <Link href="/">
          {/* <Image src='/images/Company Logo/Nav-logo.png' alt="logo" width={195} height={40} /> */}
          <Image src='/images/Images/QCS Logo.png' alt="logo" width={194.82} height={40} />
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
            {menuOpen ? <HiX className=" w-6 h-6" /> : <HiMenu className=" w-6 h-6" />}
          </button>
        </div>


        <div className={`hidden md:flex items-center space-x-4 gap-2 ${syne.className}`}>
          
          
          <Link href='/contactus' >
            <button className="border  px-[4rem] py-1 rounded-md bg-[#fff] text-[#000] hover:bg-white/50 transition-all ease-in-out duration-150 hover:text-white cursor-pointer " >
              Get a Quote
            </button>
          </Link>
        </div>
      </nav>

      {/* responsive navbar */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black py-4 space-y-4 ">
          <Link href="/services">Services</Link>
          <Link href="/courses">courses</Link>
          <Link href="services/#aboutus">About Us</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/services/contactus">Contact Us</Link>
          <div className="flex items-center">
            <IoGlobeOutline className="w-5 h-5 me-1" /> En
          </div>
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      )}
      
    </>
  );
};

export default Navbar;


