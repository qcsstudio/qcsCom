'use client'
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { container, child } from '@/components/Animation/Animation';
import { motion } from 'framer-motion';



const Questions = ({ questions }) => {
  const heading = `FAQ It Up! Your curiosity meets our expertise let's clear things up!`;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <IconNtext text="FAQ's" link="/images/Icons/FAQ.png"/>

      <div className="flex flex-col md:flex-row justify-between items-start  w-[90%] mx-auto">
        {/* Left Section */}

        <div className="md:w-1/2 space-y-4 p">

          <motion.h2
      className={`text-center lg:text-start text-3xl md:text-[48px] font-bold leading-tight mt-3 font-unbounded`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {heading.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
          <p className={`text-gray-500 font-medium text-lg text-center lg:text-start lg:w-[80%] font-montserrat`}>
            We've gathered all the important info right here. Explore our FAQs and find the answers you need.
          </p>
        </div>

        {/* Right Section (FAQ List) */}
        <div className={`md:w-1/2 space-y-4 mt-6 md:mt-0 font-montserrat`}>
          {questions?.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg cursor-pointer"
              onClick={() => toggleAnswer(index)}>
              <div className=" flex justify-between items-center py-2">
                <span className="text-gray-800 font-medium">{item.question}</span>
                <button>
                  {openIndex === index ? <ImCross className="text-xs" /> : <FaPlus />}
                </button>
              </div>
              {openIndex === index && (
                <div className="mt-2 text-gray-600 py-2">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Questions;
