'use client'
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const faqs = [
  "How quickly can AI automation show results?",
  "Are AI solutions suitable for all business sizes?",
  "How secure is your AI integration?",
  "Will AI integrations disrupt current workflows?",
  "Is specialized training needed for your AI solutions?",
  "What's your digital marketing automation approach?",
  "Can digital marketing strategies be customized per platform?",
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
    <div className=' w-[250px] mx-auto my-6 '>
    <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
        <img src='/images/Images/servicesLogo.png' />
        <span className=' font-semibold text-sm mt-1 '>Frequently Asked Questions</span>
    </h4>
    </div>
    <h1 className="text-center font-bold text-4xl mb-6">Our Stories & Team</h1>
    <div className="flex flex-col md:flex-row justify-between items-start  max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-4">
    
        <h2 className=" text-xl sm:text-3xl md:text-4xl font-bold leading-tight mt-3">
          FAQ It Up! Your curiosity meets our expertise
          <span className="block ">—let's clear things up!</span>
        </h2>
        <p className="text-gray-500 font-medium text-base sm:text-lg">
          We've gathered all the important info right here.<br/> Explore our FAQs and find the answers you need.
        </p>
      </div>

      {/* Right Section (FAQ List) */}
      <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
        {faqs.map((question, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg cursor-pointer flex justify-between items-center">
            <span className="text-gray-800 font-medium">{question}</span>
            <button className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} >
             <span><FaPlus/></span>
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Questions;
