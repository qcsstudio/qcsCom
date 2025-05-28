'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Syne, Unbounded } from 'next/font/google';
import { IoGlobeOutline } from 'react-icons/io5';
import { HiMenu, HiX } from 'react-icons/hi';
import { RxCross2 } from "react-icons/rx";

const syne = Syne({ subsets: ['latin'], weight: '400' });
const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });
const unboundedbutton = Unbounded({ subsets: ['latin'], weight: '400' });

const CoursesHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // modal control
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    dob: "",
    program: "",
    preferredStartDate: "",
    hearAboutUs: "",
    message: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      dob: "",
      program: "",
      preferredStartDate: "",
      hearAboutUs: "",
      message: "",
    });


  };

  return (
    <div className="h-[603px] w-[98%] rounded-xl mt-4 mx-auto bg-black text-white flex flex-col px-4 relative">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-4 md:px-8">
        <Link href="/">
          <Image src="/images/Images/NavLogo.png" alt="logo" width={194.82} height={40} />
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
          <Link href="/contactus">
            <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
              Get a Quote
            </button>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black py-4 space-y-4 text-white">
          <Link href="/services">Services</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/aboutus">About Us</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/contactus">Contact Us</Link>
          <div className="flex items-center">
            <IoGlobeOutline className="w-5 h-5 me-1" /> En
          </div>
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className={`text-center py-1 md:py-4 px-5 mt-10 sm:mt-24 md:mt-15`}>
        <h1 className={`text-2xl md:text-[61px] font-black ${unbounded.className}`}>
          IGNITE YOUR TECH PASSION LAUNCH YOUR DREAM CAREER
        </h1>
        <p className={`text-[#FFFFFF] text-sm md:text-2xl mt-4 max-w-4xl mx-auto ${syne.className}`}>
          Discover tech mentorship and education tailored to your interests, strengths, and goals.
          Whether you're into coding, design, data, or marketing,
          we help you align your passion with the right skills for real-world success.
        </p>
      </div>

      {/* Buttons */}
      <div className={`flex justify-center mt-6 space-x-4 ${unboundedbutton.className}`}>
        <button
          className="bg-[#F1813B] px-6 py-2 text-sm sm:text-[16px] rounded-md"
          onClick={() => setShowModal(true)}
        >
          Enroll Now
        </button>
        <button className="border border-white text-white hover:bg-white hover:text-black px-5 py-2 rounded text-sm font-medium">
          Explore Services
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={`fixed inset-0 bg-black/60 flex justify-center items-center  z-50 ${syne.className}`}>
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-3 text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
            <h2 className={`text-2xl font-bold text-center mb-6 ${unbounded.className}`}>Registration Form</h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black focus:outline-none"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 rounded focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border p-2 rounded focus:outline-none"
              />
              <div className="flex items-center border gap-1 p-2 rounded">
                <Image src="/images/Images/flag.png" width={22} height={16} alt="image" />

                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+91 Contact number"
                  className='focus:outline-none'

                />
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date Of Birth"
                className="border p-2 rounded focus:outline-none"
              />
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="border p-2 rounded col-span-2 focus:outline-none"
              >
                <option value="" disabled>
                  Choose Your Program
                </option>
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Data Science & Ai</option>
                <option>Ui Ux Designing</option>
                <option>Networking</option>
              </select>
              <input
                type="date"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleChange}
                placeholder="Preferred Start Date"
                className="border p-2 rounded col-span-2 focus:outline-none"
              />
              <input
                type='text'
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleChange}
                className="border p-2 rounded col-span-2 focus:outline-none"
                placeholder='How did you hear about us'
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any Message or Query"
                className="border p-2 rounded col-span-2 h-35 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#F1813B] text-white py-2 rounded col-span-2 hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesHeader;
