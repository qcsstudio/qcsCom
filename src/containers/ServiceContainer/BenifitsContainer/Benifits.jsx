'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules"; // ✅ Autoplay import kiya
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Syne, Unbounded } from "next/font/google";
import Heading from "@/components/HeadingComponent/Heading";
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import Image from "next/image";

const syne = Syne({ subsets: ['latin'], weight: '400' });
const unbounded = Unbounded({ subsets: ['latin'], weight: '600' });

const Benefits = ({BenefitsData }) => {
  return (
    <>
    <IconNtext text="Benefits" link="/images/Icons/Benefits.png"/>
      <Heading heading="See why partnering with us is the smartest move." />
      <div className="w-[90%] mx-auto py-10">
        <Swiper
          modules={[Navigation, Pagination, FreeMode, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 24 },
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1000, 
            disableOnInteraction: false, 
          }}
          speed={1000}
          className="pb-10"
        >
          {BenefitsData.map((benefit, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="bg-[#F5F7F9] rounded-lg p-4 h-[473px] flex flex-col sm:justify-between">
                <div>
                  <h3 className={`font-semibold text-lg md:text-2xl mb-2 ${unbounded.className}`}>{benefit.title}</h3>
                  <p className={`text-gray-600 text-base md:text-xl font-medium ${syne.className}`}>
                    {benefit.description}
                  </p>
                </div>
                <Image
                  src={benefit.image}
                  width={295}
                  height={317}
                  alt={benefit.title}
                  className="mix-blend-multiply sm:object-none "
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
