"use client";
import { IoMdPause } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay } from "swiper/modules";
import { Unbounded,Syne} from "next/font/google";

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' })
const syne = Syne({ subsets: ['latin'], weight: '400' })



const ClientStories = ({ heading ,testimonials}) => {
  return (
    <>

      <h2 className={` lg:mt-10 sm:text-[38px] w-full 
        mx-auto font-bold text-center ${unbounded.className}`}>
        {heading}
      </h2>
      <div className="w-[85%] mx-auto text-center mb-16 mt-8">
        <Swiper
          modules={[Grid, Autoplay]}
          grid={{ rows: 2, fill: "cols" }}
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
              <div className="p-6 rounded-lg bg-[#F5F7F9] h-[182px] flex">
                <p className="text-[#F1813B] text-3xl leading-none">
                  <IoMdPause />
                </p>
                <p className={`text-[#0F0F0F] text-left text-sm mt-4 ms-3 font-medium ${syne.className}`}>
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center mt-4 gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-left">
                  <p className={`font-semibold text-lg ${unbounded.className} text-[#0F0F0F]`}>{testimonial.name}</p>
                  <p className={`text-xs text-[#0F0F0F]  ${syne.className}`}>{testimonial.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ClientStories;




