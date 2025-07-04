import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Link from 'next/link';
import { Unbounded, Syne } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], Weight: '400' })
const unbounded = Unbounded({ subsets: ['latin'], Weight: '400' })
const Footer = () => {
  return (
    <>
      <footer className='bg-black text-white py-5 px-10 mt-10 rounded-ss-3xl w-full rounded-se-3xl'>
        <div className=' mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
            <div className='lg:w-[45%]  '>
              <div className='flex'>
                <img src='/images/Images/footerlogo.png' alt="logo" width={569.86} height={117} />
              </div>
              <p className={`text-[#FFFFFF]  mt-4 text-lg leading-relaxed px-4 md:px-0 text-center md:text-start  lg:w-[72%] ${unbounded.className} `}>The next big thing starts here— drop us a line and let's get creating!</p>
            </div>
            <div className='flex md:justify-normal items-start  space-x-20 sm:space-x-80  md:space-x-24 mt-8 md:mt-0'>
              <div>
                <h2 className={`font-semibold mb-4 text-[15px] ${unbounded.className}`}>Quick Links</h2>
                <ul className={`text-[#FFFFFF] space-y-3 text-sm ${syne.className}`}>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/aboutus">About us</Link></li>
                  <li><Link href="https://elevatrx.app">products</Link></li>
                  <li><Link href="/courses">Training</Link></li>
                  <li><Link href="/blogs">Blog</Link></li>
                  <li><Link href="/career">career</Link></li>
                </ul>
              </div>
              <div>
                <h2 className={`font-semibold mb-4 text-[15px] ${unbounded.className}`}>Follow Us</h2>
                <ul className='text-[#FFFFFF] space-y-3 text-sm'>
                  <li><Link href="https://www.linkedin.com/company/qcsstudio">LinkedIn</Link></li>
                  <li><Link href="https://www.facebook.com/qcsstudio">Facebook</Link></li>
                  <li><Link href="https://www.instagram.com/qcsstudio">Instagram</Link></li>
                  <li><Link href="https://www.youtube.com/@qcsstudio">YouTube</Link></li>
                  <li><Link href="https://in.pinterest.com/qcsstudio">Pinterest</Link></li>
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
                  <p className={`font-semibold  text-xs text-[#FFA587]  ${unbounded.className}`}>PHONE</p>
                </div>
                <Link href="tel:+91 8264017346">
                  <p className={`text-sm mt-2 font-normal text-[#FFFFFF]  ${syne.className}`}>+91 8264017346</p>
                </Link>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaEnvelope size={12} className='text-[#F1813B] text-xl' />
                  <p className={`font-semibold text-xs text-[#FFA587]  ${unbounded.className}`}>EMAIL</p>
                </div>
                <Link href="mailto:info@qcsstudio.com">
                  <p className={`text-sm mt-2 text-[#FFFFFF] ${syne.className}`}>info@qcsstudio.com</p>
                </Link>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaMapMarkerAlt size={12} className='text-[#F1813B] text-xl' />
                  <p className={`font-semibold text-xs text-[#FFA587] ${unbounded.className}`}>ADDRESS</p>
                </div>
                <p className={`text-sm mt-2 text-[#FFFFFF] ${syne.className}`}>D266 (C)
                  203, Second Floor
                  Ram Hari Tower, Phase 8B, Industrial Area, Sector 74
                  Mohali - 160055</p>
              </div>

              <div className=' p-4'>
                <div className='flex items-center gap-2'>
                  <FaClock size={12} className='text-[#F1813B] text-xl' />
                  <p className={`font-semibold text-xs text-[#FFA587] ${unbounded.className}`}>WORKING HOURS</p>
                </div>
                <p className={`text-sm mt-2 text-[#FFFFFF] ${syne.className}`}>Mon to Fri: 9.00am - 7.00pm | Sat/Sun: Closed</p>
              </div>
            </div>

            <div className='border-t border-gray-700 '></div>
          </div>
          <div className={`flex justify-between text-[#FFFFFF] text-[15px] mt-3  ${syne.className}`}>
            <span>
              © 2025 QuantumCrafters Studio Pvt. Ltd. All rights reserved.
            </span>
            <Link href="/privacy-policy" >
              <span className='text-[15px] ' >Privacy Policy/Terms of Service</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

