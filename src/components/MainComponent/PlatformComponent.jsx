"use client"
import React from 'react';

import Marquee from 'react-fast-marquee';

const platformImages = [
  {
    src: '/images/Images/Platform1.png',
    width: 437,
    height: 65,
  },
  {
    src: '/images/Images/Platform2.png',
    width: 264,
    height: 113,
  },
  {
    src: '/images/Images/platform3.png',
    width: 174,
    height: 65,
  },
  {
    src: '/images/Images/platform4.png',
    width: 163,
    height: 65,
  },

import { motion } from 'framer-motion';

const platformImages = [
  { src: "/images/Images/Platform1.png", width: 437, height: 65 },
  { src: "/images/Images/Platform2.png", width: 264, height: 113 },
  { src: "/images/Images/platform3.png", width: 174, height: 65 },
  { src: "/images/Images/platform4.png", width: 163, height: 65 },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const PlatformComponent = () => {
  return (

    <div className="w-[95%] mx-auto mt-10">
      <Marquee speed={100} gradient={false} className="flex items-center">
        {platformImages.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-6"
            style={{ minWidth: item.width }}
          >
            <img
              src={item.src}
              alt={`Platform ${index + 1}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PlatformComponent;

    <motion.div
      className="w-[95%] flex flex-wrap justify-evenly items-center m-auto mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {platformImages.map((item, index) => (
        <motion.img
          key={index}
          src={item.src}
          alt={`Platform ${index + 1}`}
          variants={itemVariants}
          className="m-4"
          style={{
            width: `${item.width}px`,
            height: `${item.height}px`,
            objectFit: 'contain',
          }}
        />
      ))}
    </motion.div>
  );
};

export default PlatformComponent;

