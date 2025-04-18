import React from 'react'
import { HiOutlineArrowRight } from "react-icons/hi";
import './Moment.css';
import Image from 'next/image';

const cards = [
  {
    image:"/images/Images/Subtract.png",
    memories:"Birthday"
  },
  {
    image:"/images/Images/Subtract.png",
    memories:"Diwali"
  },
  {
    image:"/images/Images/Subtract.png",
    memories:"Lohri"
  },
  {
    image:"/images/Images/Subtract.png",
    memories:"Christmas"
  }
]


const Moments = () => {
  return (
    <>
    <div className='flex justify-evenly items-center w-[85%] mx-auto my-10 gap-5'>
    {cards?.map((item,index)=>{
      return(
        
        <div  key={index} className='main'>
        <div className='Innermain'>
          <div className='Image-box'>
            <Image src={item.image} width={250} height={250} alt='image'/>
          </div>
          <div className="box-outer">
            <div className='box'>{item.memories}</div>
          </div>
        </div>

        <div className='lowerboxmain'>
          <div className='lowerbox'></div>
          <div className='circlebox'>
            <button className='circle'  ><HiOutlineArrowRight className='text-[20px] text-white font-extrabold' /></button>

          </div>
        </div>

      </div>
      
      )
    })}
    </div>
      


    </>
  )
}

export default Moments