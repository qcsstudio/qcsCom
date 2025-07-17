"use client";
import React from 'react'
import { motion } from "framer-motion";
import { IoMdPause } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/grid';
import { Grid, Autoplay } from "swiper/modules";
import { Unbounded } from "next/font/google";


const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });
const StoriesswiperTestimonial = ({ testimonials }) => {
  return (
    <>
    <div className="w-[90%] mx-auto text-center  ">
        <Swiper
          modules={[Grid, Autoplay]}
          grid={{ rows: 1, fill: "cols" }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            340: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="!pb-10"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="cursor-pointer "
              >
                <div className="p-6 rounded-lg bg-[#F5F7F9] h-[200px] flex">
                  <p className="text-[#F1813B] text-3xl leading-none">
                    <IoMdPause />
                  </p>
                  <p
                    className={`text-[#0F0F0F] text-left text-sm mt-4 ms-3 font-medium font-montserrat`}
                  >
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center mt-4 gap-3">
                  <img
                    src={testimonial.image || `https://i.pravatar.cc/150?img=${index + 1}`}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p
                      className={`font-semibold text-lg ${unbounded.className} text-[#0F0F0F]`}
                    >
                      {testimonial.name}
                    </p>
                    <p className={`text-xs text-[#0F0F0F]  font-montserrat`}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default StoriesswiperTestimonial