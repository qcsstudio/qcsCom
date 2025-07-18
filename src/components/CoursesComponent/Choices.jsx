'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IconNtext from "../iconNtextComponent/IconNtext";
import Heading from "../HeadingComponent/Heading";
import { useRouter } from 'next/navigation';

const ChoiceBox = ({
  title,
  description,
  className = "",
  extraTitle,
  extraDescription,
  button,
  image,
  onEnrollClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof onEnrollClick === "function") {
      onEnrollClick();
    } else if (typeof onEnrollClick === "string") {
      router.push(onEnrollClick);
    }
  };

  return (
    <div className={`bg-[#F5F7F9] p-5 md:p-6 rounded-xl ${className} flex flex-col justify-between h-full`}>
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

        {extraTitle && (
          <>
            <h4 className={`font-bold text-lg sm:text-xl md:text-2xl mt-8 font-unbounded`}>
              {extraTitle}
            </h4>
            <p className={`text-sm sm:text-base text-[#000000] mt-3 font-montserrat`}>
              {extraDescription}
            </p>
          </>
        )}
      </div>

      {button && (
        <button
          onClick={handleClick}
          className="bg-[#F1813B] hover:bg-[#e4a882] text-white font-semibold text-sm py-2 px-4 rounded w-full mt-6"
        >
          {button}
        </button>
      )}
    </div>
  );
};

const Choices = ({ title, data, onEnrollClick }) => {
  const router = useRouter();

  const handleClick = (clickHandler) => {
    if (typeof clickHandler === "function") {
      clickHandler();
    } else if (typeof clickHandler === "string") {
      router.push(clickHandler);
    }
  };
  return (
    <>
      <IconNtext text="Why Us" link="/images/Icons/Choices.png" />
      <Heading heading={title} />

      {/* Desktop View */}
      <div className="bg-white lg:block hidden">
        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((box, i) => (
              <ChoiceBox key={i} {...box} index={i} onEnrollClick={onEnrollClick} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden bg-white py-10 px-4 sm:px-6">
        <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-10 font-unbounded`}>
          {title}
        </h2>

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

                  {item.extraTitle && (
                    <>
                      <h4 className={`font-bold text-base sm:text-xl md:text-2xl mt-8 font-unbounded`}>
                        {item.extraTitle}
                      </h4>
                      <p className={`text-sm sm:text-base text-[#000000] mt-3 font-montserrat`}>
                        {item.extraDescription}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {item.button && (
                <button
                  onClick={() => handleClick(onEnrollClick)}
                  className="bg-[#F1813B] hover:bg-[#e4a882] text-white font-semibold text-sm py-2 px-4 rounded mt-6 w-full sm:w-auto"
                >
                  {item.button}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Choices;
