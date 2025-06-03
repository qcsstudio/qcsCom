import React from 'react'
import Marquee from "react-fast-marquee";

const Platforms = ({ heading, para, images }) => {
  return (
    <>
      <div className='my-10'>
        <h2 className="text-center text-3xl md:text-5xl font-bold  sm:my-5 px-4">
          {heading}
        </h2>
        <p className="text-center text-sm md:text-lg font-medium  sm:my-5 px-4">{para}</p>
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
