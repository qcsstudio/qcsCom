'use client'
import Heading from '@/components/HeadingComponent/Heading';
import Image from 'next/image';
import React from 'react'
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";



const Slider = ({ images }) => {
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
      <Heading heading="We don't just work together, we grow together." />
      <Marquee speed={125} gradient={false}>
        {[...images, ...images].map((slide, index) => (
          <div
            key={index}
            className="h-16 md:h-20 w-30 mx-3 my-3 flex items-center justify-center rounded-lg flex-shrink-0"
          >
            <Image
              src={slide}
              width={186}
              height={98}
              alt={`slide-${index}`}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </>
  )
}
export default Slider



