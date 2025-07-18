'use client';
import React, { useContext } from 'react';
import ListComp from '@/components/serviceComponents/ServicesComponent/ListComp';
import Scrollcomp from '@/components/serviceComponents/ServicesComponent/Scrollcomp';
import { cardcontext } from '@/context/scrollcardcontext';
import { motion } from 'framer-motion';
import { child, container } from '@/components/Animation/Animation';
import IconNtext from '@/components/iconNtextComponent/IconNtext';




const ServicesContainer = () => {
  const { listData, carddata, links } = useContext(cardcontext);

  if (!carddata || !listData || !links) return null; // Add loading/fallback if needed

  return (
    <>
    <IconNtext text="Our Services" link="/images/Icons/Our Services.png" />
    <div className="w-[90%]  mx-auto mt-10" id="services">
     

      <motion.h3
        className={`w-full md:w-[70%] mx-auto text-center lg:text-[40px] sm:text-4xl text-3xl mt-5 px-2 font-unbounded`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {"Services designed to help your brand shine brighter.".split(" ").map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block mr-2 font-unbounded`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
      <div className="flex flex-col lg:flex-row p-2 mt-8 gap-6 ">
        <ListComp listData={listData} />
        <Scrollcomp ServiceCardData={carddata} LinkData={links} />
      </div>
    </div>
    </>
  );
};

export default ServicesContainer;
