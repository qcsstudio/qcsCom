'use client'
import React from 'react';
import { motion } from "framer-motion";
import { fadeInVariant } from '../../Animation/Animation';
import { Syne, Unbounded } from 'next/font/google';


const syne = Syne({subsets: ['latin'],weight: '400'})
const unbounded = Unbounded({subsets: ['latin'],weight: '600'})
const Overview = () => {
  return (
    <>
      <div className=' mt-10 bg-[#F5F7F9] rounded-xl  p-20 font-sans'>
        <motion.h3
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          className={`text-3xl font-bold  text-[#F1813B]  ${unbounded.className}`}>Overview
        </motion.h3>
        <p className={`text-xl font-normal mt-3 text-[#00000]  ${syne.className}`}>At QuantumCrafters Studio, we specialize in
          cutting-edge AI-driven solutions, custom SaaS development, and digital marketing strategies that
          help startups and enterprises scale faster. Whether you're looking to automate workflows, build
          next-gen web platforms, or boost your online visibility, our result-oriented services are
          tailored to maximize ROI and future-proof your business. Let's transform ideas into impact —
          with innovation, speed, and smart execution.

        </p>

      </div>

    </>
  )
}

export default Overview;