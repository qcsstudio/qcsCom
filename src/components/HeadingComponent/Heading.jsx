'use client'
import React from 'react'
import { Unbounded } from 'next/font/google'
import { motion } from 'framer-motion';
import { child, container } from '@/components/Animation/Animation';

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' })
const Heading = ({ heading }) => {
  return (
    <>
      <motion.h2
        className={`lg:text-[40px] sm:text-4xl text-3xl text-center font-unbounded font-medium  my-9 sm:my-11 w-[95%] mx-auto`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}

      >
        {heading.split(' ').map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block mr-2 font-medium font-unbounded `}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </>
  )
}
export default Heading;

