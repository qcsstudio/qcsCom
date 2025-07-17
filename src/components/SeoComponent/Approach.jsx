'use client'
import React from 'react';
import Heading from '../HeadingComponent/Heading';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";


const Approach = ({ heading, card }) => {
    return (
        <>
        <div className='mt-10'>
            <Heading heading={heading} />
            <div className="w-[90%] md:w-[90%] mx-auto py-10">
                {/* ------------swiper--------- */}
                <Swiper
                    modules={[Navigation, FreeMode, Autoplay]}
                    spaceBetween={46}
                    slidesPerView={3.5}
                    breakpoints={{
                        640: { slidesPerView: 1.5, spaceBetween: 20 },
                        768: { slidesPerView: 2.2, spaceBetween: 20 },
                        1024: { slidesPerView: 3.5, spaceBetween: 24 },
                    }}
                    autoplay={{
                        delay: 800,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    freeMode={true}
                    speed={1000}
                >
                    {card?.map((cardsData, index) => (
                        <SwiperSlide>
                            <div key={index} className="bg-[#F5F7F9] w-full h-[480px] max-w-[335px] p-4 rounded-xl ">
                                {cardsData.heading && (
                                    <h3 className={`text-[24px] text-[#0F0F0F] mb-3 h-[84px] font-unbounded`} dangerouslySetInnerHTML={{ __html: cardsData.heading }}/>
                                )}
                                {cardsData.para && <p className="mb-3 mt-7 text-[20px] text-[#030204">{cardsData.para}</p>}
                                {cardsData.list?.length > 0 && (
                                    <ul className="list-disc marker:text-[#F1813B] px-5  text-[15px] text-[#000000]">
                                        {cardsData.list.map((point, i) => (
                                            <li
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: point }}
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </div>
        </>
    );
};

export default Approach;
