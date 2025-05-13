'use client'
import { Syne, Unbounded } from "next/font/google";
import { useState } from "react";
import { FaPlus  } from "react-icons/fa";
import { ImCross } from "react-icons/im";


const syne = Syne({subsets: ['latin'],weight: '400'})
const unbounded = Unbounded({subsets: ['latin'],weight: '600'})
const Questions = ({questions}) => {
 
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className=' w-[250px] mx-auto my-6 '>
        <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
          <img src='/images/Images/servicesLogo.png' />
          <span className="font-semibold text-sm mt-1 ">Frequently Asked Questions</span>
      </h4>
      </div>
     
      <div className="flex flex-col md:flex-row justify-between items-start  max-w-6xl mx-auto">
        {/* Left Section */}
        
        <div className="md:w-1/2 space-y-4 p">

          <h2 className={`text-center lg:text-start text-3xl md:text-[48px] font-bold leading-tight mt-3 ${unbounded.className}`}>
            FAQ It Up! Your curiosity<br/>
            meets our expertise
            let's clear things up!
          </h2>
          <p className={`text-gray-500 font-medium text-lg text-center lg:text-start lg:w-[80%] ${syne.className}`}>
            We've gathered all the important info right here. Explore our FAQs and find the answers you need.
          </p>
        </div>

        {/* Right Section (FAQ List) */}
        <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
        {questions?.map((item, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg">
          <div
            onClick={() => toggleAnswer(index)}
            className="cursor-pointer flex justify-between items-center"
          >
            <span className="text-gray-800 font-medium">{item.question}</span>
            <button>
              {openIndex === index ? <ImCross  /> : <FaPlus />}
            </button>
          </div>
          {openIndex === index && (
            <div className="mt-2 text-gray-600">{item.answer}</div>
          )}
        </div>
      ))}
        </div>
      </div>
    </>
  );
}

export default Questions;
