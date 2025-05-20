'use client';
import React, { useContext } from 'react';
import ListComp from '@/components/serviceComponents/ServicesComponent/ListComp';
import Scrollcomp from '@/components/serviceComponents/ServicesComponent/Scrollcomp';
import { Unbounded } from 'next/font/google';
import { cardcontext } from '@/context/scrollcardcontext';

const unbounded = Unbounded({ subsets: ['latin'], weight: '500' });

const ServicesContainer = () => {
  const { listData, carddata, links } = useContext(cardcontext);

  if (!carddata || !listData || !links) return null; // Add loading/fallback if needed

  return (
    <div className="w-[90%] max-w-7xl mx-auto mt-10">
      <div className="w-[133px] mx-auto">
        <h4 className="flex justify-center gap-2 bg-gray-100 rounded-e-lg px-2 py-1">
          <img src="/images/Images/servicesLogo.png" alt="Services Logo" className="w-5 h-5" />
          <span className="font-semibold text-sm mt-1">Our Services</span>
        </h4>
      </div>
      <h1 className={`w-full md:w-[70%] mx-auto text-center font-medium text-2xl md:text-4xl mt-5 px-2 ${unbounded.className}`}>
        Services designed to help your brand shine brighter.
      </h1>
      <div className="flex flex-col lg:flex-row p-2 mt-8 gap-6 ">
        <ListComp listData={listData} />
        <Scrollcomp ServiceCardData={carddata} LinkData={links} />
      </div>
    </div>
  );
};

export default ServicesContainer;
