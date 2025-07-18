'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/serviceComponents/NavbarComponent/Navbar';
import Button from '@/components/serviceComponents/NavbarComponent/NavButton';
import { Unbounded } from 'next/font/google';
import HeaderGradiantComponent from '@/components/HeaderComponent/HeaderGradiantComponent';

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });

const movements = [
  'movement1',
  'movement2',
  'movement3',
  'movement4',
  'movement5',
];
export default function NavbarContainer({ data }) {
  if (!data) return null;
  const { heading, para, buttons, image } = data;
 


  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden flex items-center text-white">
      
      <HeaderGradiantComponent />

      <div className="absolute top-2 left-0 w-full z-10">
        <Navbar />
      </div>
      <div className="absolute  left-5 w-full px-4 md:px-17 flex flex-col md:flex-row items-center justify-between">


        <div className="w-full lg:w-[50%] xl:w-[51%] flex flex-col justify-center text-black sm:mt-[25rem] md:mt-[0rem] min-[320px]:mt-[20rem]">

          <motion.h1
            className={`text-3xl  min-[1280px]:text-[55px] lg:text-[46px] md:text-[40px]   font-bold leading-tight font-unbounded`}
            style={{    
              mixBlendMode:"overlay"

            }}

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {heading}
          </motion.h1>

          <motion.h2

            className={`text-3xl min-[1280px]:text-[65px] lg:text-[46px] md:text-[40px] sm:text-3xl  xl:w-[49%]
               min-[1262px]:w-[45%] min-[1146px]:w-[45%] min-[1033px]:w-[45%] min-[1024px]:w-[43%] min-[1015px]:w-[45%]
                min-[917px]:w-[45%] min-[977px]:w-[43%] min-[894px]:w-[42.39%] min-[882px]:w-[42%] min-[865px]:w-[43%] 
                min-[768px]:w-[42%] min-[1123px]:w-[40%] min-[733px]:w-[95%] min-[709px]:w-[100%] min-[693px]:w-[90%]
                 min-[640px]:w-[95%] min-[601px]:w-[95%] min-[516px]:w-[94%] min-[506px]:w-[95%] min-[489px]:w-[95%] 
                 min-[497px]:w-[90%] min-[401px]:w-[90%] min-[427px]:w-[95%] min-[417px]:w-[93%] min-[1145px]:w-[40%]
                  min-[345px]:w-[90%] min-[361px]:w-[92%] z-[-1] absolute md:top-[0] sm:top-[25rem] 
                  min-[320px]:top-[20rem] font-bold leading-tight font-unbounded`}
            

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className={`mt-2 text-lg lg:text-[17px] xl:text-[19px] xl:w-[90%] text-start leading-tight font-montserrat`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {para}
          </motion.p>

          <motion.div
            className="mt-4 flex flex-wrap gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
          >
            {buttons?.map((btn, i) => (
              <div key={i} className='font-montserrat'>
                {btn.action ? (
                  <button
                    onClick={btn.action}
                    style={{ backgroundColor: btn.color, border: btn.border }}
                    className="hover:bg-[rgb(241,129,59)]  px-6 py-2 text-sm sm:text-[16px] cursor-pointer rounded-md transition-colors duration-200"
                  >
                    {btn.text}
                  </button>
                ) : (
                  <Button
                    text={btn.text}
                    color={btn.color}
                    border={btn.border}
                    link={btn.link}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="w-full  lg:w-[550px] xl:w-[760px]  top-5 static lg:absolute lg:right-0 h-auto flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt="hero-image"
            className="w-auto h-auto max-w-full max-h-[519px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
