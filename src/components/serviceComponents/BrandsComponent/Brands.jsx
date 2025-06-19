import React from 'react'
import { BrandsData } from '@/containers/ServiceContainer/BrandsContainer/BrandsData.jsx'
import { Syne, Unbounded } from 'next/font/google';
import Heading from '@/components/HeadingComponent/Heading'
import CountUp from 'react-countup';

const syne = Syne({ subsets: ['latin'], weight: 'variable' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '400' })
const Brands = () => {

  return (
    <>
      <div className="w-[90%] mx-auto">
        <Heading heading="Building brands, boosting businesses, and redefining possibilities Let's grow your brand together." />
        <div className=' w-full   m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:justify-evenly  gap-10 my-10 '>
          {BrandsData.map((stat, index) => (
            <div key={index} className=" md:p-0 px-5">
              <div className="border border-dashed h-[142px] m-auto md:w-full bg-[#F5F7F9] text-start px-5 box-border rounded-[30px] border-gray-500">
                <h2 className="text-[74px] flex font-medium text-gray-900">
                  <CountUp end={stat.value} duration={2} start={0}  enableScrollSpy />
                  <span className="text-[#F1813B] text-2xl items-center ms-1 flex">{stat.sign}</span>
                </h2>
                <h3 className={`text-xl  font-medium -mt-4 ${unbounded.className} `}>{stat.label}</h3>
              </div>
              <p className={`mt-2 text-[17px] px-5 text-[#000000]  font-unbounded ${syne.className}`}>{stat.desc}</p>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}
export default Brands