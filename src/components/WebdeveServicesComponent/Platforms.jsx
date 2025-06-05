import { Syne, Unbounded } from 'next/font/google';
import React from 'react'
import Marquee from "react-fast-marquee";
import Heading from '../HeadingComponent/Heading';

const syne = Syne({subsets:['latin'],weight:"500"})
const unbounded = Unbounded({subsets:['latin'],weight:"700"})
const   Platforms = ({ heading, para, images }) => {
  return (
    <>
      <div className='my-10'>
       <Heading heading={heading}/>
        <p className={`text-center text-sm md:text-lg font-medium  sm:my-5 px-4 ${syne.className}`}>{para}</p>
      </div>
      <Marquee speed={125} gradient={false}>
        {[...images, ...images].map((slide, index) => (
          <div
            key={index}
            className="h-16 md:h-20 w-30 mx-3 my-3 flex items-center justify-center rounded-lg flex-shrink-0"
          >
            <img
              src={slide}
              alt={`slide-${index}`}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </>
  )
}

export default Platforms;
