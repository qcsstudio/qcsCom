import React from 'react'
import {BrandsData} from '@/containers/BrandsContainer/BrandsData.jsx'

const Brands = ({title}) => {
 
  return (
   <>
      <h1 className="text-4xl w-[85%] mx-auto text-center font-bold mt-10 ">
        {title}
      </h1>
      
      <div className=' w-full md:w-[85%]  m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:justify-evenly  gap-10 my-10 '>
        {BrandsData.map((stat, index) => (
          <div key={index} className=" md:p-0 px-5">
            <div className="border border-dashed h-[142px] m-auto md:w-full bg-[#F5F7F9] text-start px-5 box-border rounded-[30px] border-gray-500">
              <h2 className="text-[74px] flex font-medium  text-gray-900">
                {stat.value}<span className="text-[#F1813B] text-2xl items-center ms-1 flex">{stat.sign}</span>
              </h2>  
              <h3 className="text-2xl  font-medium -mt-4 ">{stat.label}</h3>
          </div>
            

              <p className="mt-2 text-base px-5 text-[#000000]">{stat.desc}</p>
            
            </div>
        ))}
      
    </div>
    </>
  );
    
}

export default Brands