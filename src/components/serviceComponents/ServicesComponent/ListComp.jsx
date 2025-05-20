'use client';
import { Syne, Unbounded } from 'next/font/google';
import React, { useContext } from 'react';
import { cardcontext } from '@/context/scrollcardcontext';

const syne = Syne({ subsets: ['latin'], weight: '400' });
const unbounded = Unbounded({ subsets: ['latin'], weight: '300' });

const ListComp = ({ listData }) => {
  const { scrollToCard } = useContext(cardcontext);

  return (
    <div className={`w-full lg:w-[37%] hidden lg:block ${unbounded.className}`}>
      <div className="grid grid-cols-1 gap-3">
        {listData.map((service, index) => (
          <div key={index} className="py-2 cursor-pointer" onClick={() => scrollToCard(index)}>
            <h3 className="text-lg md:text-[20px] text-[#0F0F0F]">{service}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComp;
