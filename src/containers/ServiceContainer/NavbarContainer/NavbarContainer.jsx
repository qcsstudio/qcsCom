'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/serviceComponents/NavbarComponent/Navbar'; // Adjust if needed
import Button from '@/components/serviceComponents/NavbarComponent/NavButton'; // Adjust if needed
import Image from 'next/image';

const movements = [
  'movement1', // horizontal slide
  'movement2', // vertical slide
  'movement3', // diagonal slide
  'movement4', // gentle pulse
  'movement5', // background-size drift
];

export default function NavbarContainer({ data }) {
  if (!data) return null;
  const { heading, para, buttons } = data;

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
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* 60% gradient background */}
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        style={{ x: sx, y: sy }}
        className={`
          absolute inset-0
          bg-gradient-parallax
          clip-gradient
          ${movements[mv]}
          z-0 pointer-events-none
        `}
      />

      {/* 40% images */}
      <div className="absolute inset-0 clip-images z-0 pointer-events-none flex item-right justify-right">
        {/* Replace with your actual image path */}
        <Image
          src="/images/Images/Object.png"
          alt="QuantumCrafters Logo"
          width={800}
          height={400}
          priority
        />
      </div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-40">
        <Navbar />
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {para}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
        >
          { buttons?.map((btn, i) => (
            <Button key={i} text={btn.text} color={btn.color} border={btn.border} link={btn.link} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
