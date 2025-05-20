// Scrollcomp.js
import React from 'react';
import Cardscroll from './Cardscroll';

export default function Scrollcomp({ ServiceCardData }) {
  return (
    <div className="w-full lg:w-[63%] h-[390px] lg:h-[600px] overflow-y-auto no-scrollbar space-y-4">
      {ServiceCardData.map((card, index) => (
        <div key={index}>
          <Cardscroll card={card} />
        </div>
      ))}
    </div>
  );
}
