import React from 'react';
import { CardData, LinkData } from './CardData';
import Cardscroll from './Cardscroll';

export default function Scrollcomp() {
  return (
    <div className="w-full lg:w-[60%] h-[390px] lg:h-[600px] overflow-y-auto no-scrollbar space-y-4">
      {CardData.map((card, index) => (
        <div key={index}>
          <Cardscroll card={card} link={LinkData.links[index]} />
        </div>
      ))}
    </div>
  );
}
