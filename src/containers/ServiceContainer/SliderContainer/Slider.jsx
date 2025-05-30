'use client'
import Heading from '@/components/HeadingComponent/Heading';
import React from 'react'
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";



const Slider = ({images}) => {
    const [direction, setDirection] = useState("left");
    const [counter, setCounter] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prev) => {
          const newCount = (prev + 3) % 4;
          if (newCount === 0 || newCount === 2) {
            setDirection("left");
          } else {
            setDirection("right");
          }
          return newCount;
        });
      }, 8000);
  
      return () => clearInterval(interval);
    }, []);
  

  return (
    <>
    <Heading heading="We don't just work together, we grow together."/>
        <Marquee speed={250} gradient={false} direction={direction}>
        <div className="flex gap-6 px-4">
          {images.map((slide, index) => (
            <div
              key={index}
              className="h-16 md:h-20 w-40 md:w-52 flex items-center justify-center rounded-lg flex-shrink-0"
            >
              <img
                src={slide}
                alt="slidesImage"
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </>
  )
}

export default Slider