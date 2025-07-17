'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IconNtext from "../iconNtextComponent/IconNtext";
import Heading from "../HeadingComponent/Heading";



const ChoiceBox = ({ title, description, image }) => {
  return (
    <div className="bg-[#F5F7F9] p-5 md:p-6 rounded-xl flex flex-col justify-between h-full min-h-[260px]">
      <div>
        <div className="bg-black w-14 h-14 rounded-full mb-4 flex items-center justify-center">
          <Image src={image} width={32} height={32} alt="icon" />
        </div>
        <h3
          className={`text-lg sm:text-xl md:text-2xl font-bold leading-snug mb-2 font-unbounded`}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p className={`text-sm sm:text-base text-[#000000] mb-2 font-montserrat`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const Whychoose = ({ title, data }) => {
  return (
    <>
      <IconNtext text="Why Us" link="/images/Icons/Choices.png" />
      {/* Desktop View */}
      <div className="bg-white  w-[90%]  mx-auto lg:block hidden">
        <Heading heading="Why Choose Quantum craft studio for Your Digital Success?"/>
        <div className="w-full max-w-7xl mx-auto">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.slice(0, 3).map((box, i) => (
              <ChoiceBox key={i} {...box} />
            ))}
          </div>
          {/* Second Row - 2 Cards, 4th wider */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {data[3] && (
              <div className="w-full lg:w-[66%]">
                <ChoiceBox {...data[3]} />
              </div>
            )}
            {data[4] && (
              <div className="w-full lg:w-[32%]">
                <ChoiceBox {...data[4]} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden bg-white py-10 px-4 sm:px-6">
        <Heading heading="Why Choose Quantum craft studio for Your Digital Success?"/>
        <div className="space-y-10">
          {data?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
              className="bg-[#F5F7F9] p-5 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="bg-black w-14 h-14 rounded-full mb-4 flex items-center justify-center mx-auto sm:mx-0">
                  <Image src={item.image} width={32} height={32} alt="icon" />
                </div>

                <div className="text-center sm:text-left">
                  <h3
                    className={`text-base sm:text-xl md:text-2xl font-bold leading-snug mb-2 font-unbounded`}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />

                  <p className={`text-sm sm:text-base text-[#000000] mb-2 font-montserrat`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Whychoose;
