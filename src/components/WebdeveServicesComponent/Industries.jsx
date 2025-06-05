'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Heading from "../HeadingComponent/Heading";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({subsets:['latin'],weight:"500"})
const Industries = ({heading,Data}) => {
  
 
  return (
    <>
      <div className="w-[90%] md:w-[90%] mx-auto py-10">
    <Heading heading={heading}/>
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
          {Data.map((benefit, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="bg-[#F5F7F9] rounded-lg p-4 h-[420px] flex flex-col sm:justify-between">
                <div>
                  <h3 className={`font-medium text-lg md:text-[21px] ${unbounded.className}`}>{benefit.title}</h3>
                  
                </div>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  width={295}
                  height={317}
                  
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
    </>
  );
};

export default Industries;
