'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/serviceComponents/NavbarComponent/Navbar'; // Adjust if needed
import Button from '@/components/serviceComponents/NavbarComponent/NavButton'; // Adjust if needed
import Image from 'next/image';
import { Syne, Unbounded } from 'next/font/google';

const unbounded = Unbounded({subsets: ['latin'],weight: '700'})
const syne = Syne({subsets: ['latin'],weight: '600'})

const movements = [
  'movement1', // horizontal slide
  'movement2', // vertical slide
  'movement3', // diagonal slide
  'movement4', // gentle pulse
  'movement5', // background-size drift
];

export default function NavbarContainer({ data }) {
  if (!data) return null;
  const { heading, para, buttons, image } = data;

  // cycle through movements every 20s
  const [mv, setMv] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setMv(i => (i + 1) % movements.length);
    }, 20000);
    return () => clearInterval(id);
  }, []);

  // mouse parallax only on gradient area
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 60, damping: 25 });
  const sy = useSpring(mvY, { stiffness: 60, damping: 25 });

  const handleMouse = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mvX.set(x * 15);
    mvY.set(y * 15);
  };
  const resetMouse = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex text-white">
      {/* 60% gradient background */}
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        style={{ x: sx, y: sy }}
        className={`
          absolute inset-0
          bg-gradient-parallax
          clip-gradient
          ${unbounded.className}
          ${movements[mv]}
          z-0 pointer-events-none
          
        `}
      />



      {/* Navbar */}
      <div className="absolute top-5 left-0 w-full z-40">
        <Navbar />
      </div>


      {/* Hero content */}

      <div className="absolute top-28 left-15 flex flex-row w-[95%]  ">
        {/* meta title & description */}
        <div className=" relative top-6 flex flex-col justify-center  text-black w-[54%]">
          <motion.h1
            className={`text-4xl md:text-[55px] font-extrabold leading-tight max-w-[710px] ${unbounded.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {heading}
          </motion.h1>
          <motion.p
            className={`mt-2 text-lg md:text-[23px] max-w-[32.5rem] text-start leading-tight ${syne.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {para}
          </motion.p>

          {/* Hero section buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
          >
          
{buttons?.map((btn, i) => (
  <div key={i}
  className= {`${syne.className} cursor-pointer`}>
    {btn.action ? (
      <button
        onClick={btn.action}
        style={{ backgroundColor: `${btn.color}`, border: `${btn.border}` }}
        className="hover:bg-[rgb(241,129,59)] px-6 py-2 text-sm sm:text-[16px] cursor-pointer rounded-md transition-colors duration-200"
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

        
        <div className='w-[760px] h-[519px] absolute right-0 '>
          <Image src={image}
            fill={true}
            className='object-contain'
            alt="hero-image"
          />
        </div>


      </div>

    </section>
  );
}
