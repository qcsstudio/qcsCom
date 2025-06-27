import React from 'react'
import { Syne, Unbounded } from "next/font/google";
import Heading from "../HeadingComponent/Heading";
import Link from 'next/link';

const syne = Syne({ subsets: ['latin'], weight: '500' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '600' })
const DigitalServices = ({ data }) => {
  return (
    <>
      <Heading heading="All-in-One Online Marketing & Analytics Suite" />
      <div className="bg-white text-center w-[90%] mx-auto">
        <p className={`text-center text-[15px] my-5 ${syne.className}`}>We work on powerful, popular, customisable and scalable platforms to deliver the best solutions for our clients.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((card, index) => (
            <Link href={card.link} key={index}>
              <div
                className="bg-[#F5F7F9] rounded-2xl p-6 text-left h-[350px] "
              >

                <h3 className={`text-2xl font-bold mb-3 text-[#1f0909] ${unbounded.className}`}>{card.title}:</h3>
                <ul className={`list-disc pl-5 space-y-1 text-lg text-[#000000] marker:text-[#F1813B] ${syne.className}`}>
                  {card.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </Link>

          ))}
        </div>
      </div>

    </>
  )
}

export default DigitalServices