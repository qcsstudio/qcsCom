'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Syne, Unbounded } from "next/font/google";

const syne = Syne({subsets: ['latin'],weight: '400'})
const unbounded = Unbounded({subsets: ['latin'],weight: '600'})
const Benefits = ({heading,BenefitsData}) => {
  
 
  return (
    <>
      <div className="w-[90%] md:w-[85%] mx-auto py-10">
        <h2 className={`text-center text-3xl md:text-[35px] font-bold mb-8 ${unbounded.className}`}>
          {heading}
        </h2>

        <Swiper
          modules={[Navigation, Pagination, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 24 },
          }}
          loop={true}
          freeMode={true}
          speed={3000}
          className="pb-10"
        >
          {BenefitsData.map((benefit, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="bg-[#F5F7F9] rounded-lg p-4 sm:h-[400px] flex flex-col sm:justify-between">
                <div>
                  <h3 className={`font-semibold text-lg md:text-2xl mb-2 ${unbounded.className}`}>{benefit.title}</h3>
                  <p className="text-gray-600 text-base md:text-xl  font-medium ">
                    {benefit.description}
                  </p>
                </div>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="mix-blend-multiply  sm:object-none "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
    </>
  );
};

export default Benefits;
