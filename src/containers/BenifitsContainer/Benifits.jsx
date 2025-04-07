'use client'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Marquee from "react-fast-marquee";

const benefits = [
  {
    title: "Superior Productivity:",
    description: "Eliminate redundancy with automated workflows",
    image: "/images/Images/swiper1.png",
  },
  {
    title: "Streamlined Operations",
    description: "Seamless AI integration to optimize efficiency",
    image: "/images/Images/swiper2.png",
  },
  {
    title: "Intelligent Decision-Making",
    description: "Access deep insights for strategic clarity",
    image: "/images/Images/swiper3.png",
  },
  {
    title: "Accelerated Business Growth:",
    description: "Harness predictive analytics for market advantage",
    image: "/images/Images/swiper4.png",
  },
  {
    title: "Adaptive Scalability:",
    description: "Effortlessly scale operations with adaptive AI tools",
    image: "/images/Images/swiper5.png",
  },
];

const ImagesSlide = [
  "/images/Images/slide1.png",
  "/images/Images/slide2.png",
  "/images/Images/slide3.png",
  "/images/Images/slide4.png",
  "/images/Images/slide5.png",
  "/images/Images/slide6.png",
];

const Benefits = () => {
  const [direction, setDirection] = useState("left");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const newCount = (prev + 3) % 4;
        if (newCount === 0 || newCount === 2) {
          setDirection("left");
        } else {
          setDirection("right");
        }
        return newCount;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-[90%] md:w-[85%] mx-auto py-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          See why partnering with us is the smartest move.
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
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="bg-[#F5F7F9] rounded-lg p-4 h-[480px] flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg md:text-2xl mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-base md:text-xl  font-medium ">
                    {benefit.description}
                  </p>
                </div>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="mix-blend-multiply object-contain sm:object-none "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className="text-center text-3xl md:text-5xl font-bold my-10 px-4">
        We don't just work together, we grow together.
      </h2>

      <Marquee speed={300} gradient={false} direction={direction}>
        <div className="flex gap-6 px-4">
          {ImagesSlide.map((slide, index) => (
            <div
              key={index}
              className="h-16 md:h-20 w-40 md:w-52 flex items-center justify-center rounded-lg flex-shrink-0"
            >
              <img
                src={slide}
                alt="slidesImage"
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default Benefits;
