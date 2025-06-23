'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/serviceComponents/NavbarComponent/Navbar';
import Button from '@/components/serviceComponents/NavbarComponent/NavButton';
import Image from 'next/image';
import { Syne, Unbounded } from 'next/font/google';
import HeaderGradiantComponent from '@/components/HeaderComponent/HeaderGradiantComponent';

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });
const syne = Syne({ subsets: ['latin'], weight: '500', display: 'swap' });

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
  // const [mv, setMv] = useState(0);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setMv(i => (i + 1) % movements.length);
  //   }, 20000);
  //   return () => clearInterval(id);
  // }, []);

  // const mvX = useMotionValue(0);
  // const mvY = useMotionValue(0);
  // const sx = useSpring(mvX, { stiffness: 60, damping: 25 });
  // const sy = useSpring(mvY, { stiffness: 60, damping: 25 });

  // const handleMouse = e => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  //   const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  //   mvX.set(x * 15);
  //   mvY.set(y * 15);
  // };
  // const resetMouse = () => {
  //   mvX.set(0);
  //   mvY.set(0);
  // };

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden flex items-center text-white">
      {/* <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        style={{ x: sx, y: sy }}
        className={`absolute inset-0 bg-gradient-parallax clip-gradient ${unbounded.className} ${movements[mv]} z-0 pointer-events-none`}

      /> */}
      <HeaderGradiantComponent/>

      <div className="absolute top-2 left-0 w-full z-10">
        <Navbar />
      </div>

      <div className="absolute  left-5 w-full px-4 md:px-17 flex flex-col lg:flex-row items-center justify-between">

        <div className="w-full lg:w-[50%] xl:w-[51%]  flex flex-col justify-center text-black">

          <motion.h1
            className={`text-3xl xl:text-[59px] md:text-[46px]  font-extrabold leading-tight ${unbounded.className}`}
            // style={{    
            //   mixBlendMode:"overlay"
            // }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {heading}
          </motion.h1>
          <motion.p
            className={`mt-2 text-lg lg:text-[17px] xl:text-[19px] xl:w-[90%] text-start leading-tight ${syne.className}`}
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
              <div key={i} className={syne.className}>
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
