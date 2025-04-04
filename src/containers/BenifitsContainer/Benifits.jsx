'use client'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";
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
]

const Benefits = () => {

  const [direction, setDirection] = useState("left");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        const newCount = (prev + 3) % 4; // total 4 cycles
        if (newCount === 0 || newCount === 2) {
          setDirection("left");
        } else {
          setDirection("right");
        }
        return newCount;
      });
    }, 8000); // duration each direction lasts (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
    <div className="w-[85%]  mx-auto py-10">
      <h2 className="text-center text-4xl font-bold mb-6">
        See why partnering with us is the smartest move.
      </h2>
      <Swiper
        modules={[Navigation, Pagination, FreeMode]}
        spaceBetween={20}
        slidesPerView={3.5}
        loop={true}  
        freeMode={true}  // Enables smooth infinite scroll
        speed={3000}  // Controls smoothness
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20  },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="pb-10 mySwiper"
      >
        {benefits.map((benefit, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center rounded-lg mx-auto   ">
          
              <div className="bg-[#F5F7F9] p-3">
                
                  <h3 className="font-semibold text-xl">{benefit.title}</h3>
                  <p className="text-gray-600  font-medium text-xl">{benefit.description}</p>
                
                <img src={benefit.image} alt={benefit.title} className="mix-blend-multiply" />
              </div>
           
          </SwiperSlide>
        ))}
      </Swiper>

                  {/* next autoplay slider */}


      
    </div>
     <h2 className="text-center text-5xl font-bold my-10">
     We don't just work together we grow together.      
   </h2>

   <Marquee speed={300} gradient={false} direction={direction}>
  <div className="flex gap-4">
    {ImagesSlide.map((slide, index) => (
      <div
        key={index}
        className="  h-20 w-52 flex items-center justify-center rounded-lg flex-shrink-0"
      >
        <img
          src={slide}
          alt="slidesImage"
          className="h-full object-contain"
        />
      </div>
    ))}
  </div>
</Marquee>

 </>
  );
}

export default Benefits;
