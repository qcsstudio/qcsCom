import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className='bg-black text-white py-5 px-10 mt-10 rounded-ss-3xl w-full rounded-se-3xl'>
        <div className='max-w-[1200px] mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
            <div className='lg:w-[45%]  '>
              <div className='flex'>
                <img src='/images/Images/footerlogo.png' alt="logo" width={569.86} height={117} />
                {/* <h1 className=' text-2xl sm:text-4xl text-end font-medium '>QuantumCrafters Studio Private Limited</h1> */}
              </div>
              <p className='text-[#FFFFFF]  mt-4 text-lg leading-relaxed px-4 md:px-0 text-center md:text-start  lg:w-[54%] '>The next big thing starts here— drop us a line and let’s get creating!</p>
            </div>
            <div className='flex md:justify-normal items-start  space-x-20 sm:space-x-80  md:space-x-24 mt-8 md:mt-0'>
              <div>
                <h2 className='font-semibold mb-4 text-lg'>Quick Links</h2>
                <ul className='text-[#FFFFFF] space-y-3 text-sm'>
                  <li>Home</li>
                  <li>About</li>
                  <li>Products</li>
                  <li>Training</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h2 className='font-semibold mb-4 text-lg'>Follow Us</h2>
                <ul className='text-[#FFFFFF] space-y-3 text-sm'>
                  <li>LinkedIn</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-700 '></div>
          <div className='text-gray-400 '>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-10 items-start'>
              <div className=' p-4'>
                <div className='flex  text gap-2'>
                  <FaPhoneAlt size={12} className='text-[#F1813B] text-xl' />
                  <p className='font-semibold  text-xs text-[#FFA587] '>PHONE</p>
                </div>
                <p className='text-sm font-normal text-[#FFFFFF]'>+91 8264017346</p>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaEnvelope size={12} className='text-[#F1813B] text-xl' />
                  <p className='font-semibold text-xs text-[#FFA587]'>EMAIL</p>
                </div>
                <p className='text-sm font-normal text-[#FFFFFF]'>info@qcsstudio.com</p>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaMapMarkerAlt size={12} className='text-[#F1813B] text-xl' />
                  <p className='font-semibold text-xs text-[#FFA587]'>ADDRESS</p>
                </div>
                <p className='text-sm font-normal text-[#FFFFFF]'>Prosperity Arcade, D-229, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160071</p>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaClock size={12} className='text-[#F1813B] text-xl' />
                  <p className='font-semibold text-xs text-[#FFA587]'>WORKING HOURS</p>
                </div>
                <p className='text-sm font-normal text-[#FFFFFF]'>Mon to Sat: 9.00am - 8.30pm | Sun: Closed</p>
              </div>
            </div>

            <div className='border-t border-gray-700 '></div>
          </div>
          <div className=' flex justify-between text-[#FFFFFF] text-sm mt-3'>
            <span>
              © 2025 QuantumCrafters Studio Pvt. Ltd. All rights reserved.
            </span>
            <Link href="/policy" >
              <span className='text-base' >Privacy Policy/Terms of Serviceok</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer