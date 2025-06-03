'use client'
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const members = [
  {
    name: "Poonam Kumari",
    image: "/images/Images/teammember.png",
    position: "Founder & Director",
    link: "http://www.linkedin.com/in/poonamqcss"
  },
  {
    name: "Ravi K Sankhyan",
    image: "/images/Images/teammember1.jpg",
    position: "Co-Founder & Director",
    link: "http://www.linkedin.com/in/rksankhyan"
  },
  {
    name: "Sheetal Rani",
    image: "/images/Images/teammember2.png",
    position: "Human Resources Manager",
    link: "https://www.linkedin.com/in/sheetal-rani-"
  },
  {
    name: "Diksha Chauhan",
    image: "/images/Images/teammember3.png",
    position: "Digital Marketing Manager",
    link: "https://www.linkedin.com/in/diksha-chauhan-829333163/"
  },
  {
    name: "Puneet Verma",
    image: "/images/Images/teammember5.jpeg",
    position: "Team Lead/Software Developer",
    link: "https://www.linkedin.com/in/puneetvermax/"
  },
  {
    name: "Vishal",
    image: "/images/Images/Vishal.png",
    position: "UI/UX Professional",
    link: "https://www.linkedin.com/in/vishal-kumar-9022b4219/"
  },
];

const AboutUs = () => {
  return (
    <div id="aboutus" className="max-w-7xl mx-auto py-10 px-4">
      <div className="w-[138px] mx-auto my-6">
        <h4 className="flex justify-center gap-2 bg-gray-100 rounded-e-lg">
          <img src="/images/Images/servicesLogo.png" />
          <span className="font-semibold text-sm mt-1">About US</span>
        </h4>
      </div>
      <h1 className="text-center font-bold text-4xl mb-6">Our Stories & Team</h1>
      <p className="text-[#000000] font-medium text-xl mx-auto mb-4  max-w-6xl">
        We started as a small group of passionate creators who believed that great ideas deserve bold execution.
        What began over coffee-fueled brainstorming sessions has grown into a thriving digital agency dedicated
        to helping brands stand out.
      </p>
      <p className="text-[#000000] font-medium text-xl mx-auto mb-12  max-w-6xl">
        Our mission is simple: to craft creative, impactful solutions that drive results. With a vision to empower
        businesses to shine in a crowded world, we combine strategy, design, and a touch of magic to bring your
        ideas to life. Let's make something amazing together!
      </p>

      {/* ✅ Make flex column on small screens and row on larger */}
      <div className="flex flex-col lg:flex-row gap-5 items-center  justify-evenly lg:items-start">
        {/* ✅ Set width full for small and fixed for large */}
        <div className="w-full lg:w-[77%]">
          <Swiper
            modules={[Navigation, Pagination, FreeMode, Autoplay]}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            freeMode={true}
            loop={true}
            speed={1000}
            spaceBetween={20}
          >
            {members.map((member, index) => (
              <SwiperSlide key={index} >
                <div className="bg-[#F5F7F9] p-1 w-[300px] rounded-lg">
                  <div className="text-white rounded-lg text-center">
                    <img
                      src={member.image}
                      className="w-full h-[352px] rounded-lg mb-3 object-cover"
                      alt={member.name}
                    />
                    <h3 className="font-semibold text-black text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.position}</p>
                    <div className="flex justify-center">
                      <Link href={member.link} target="_blank">
                        <FaLinkedin className="cursor-pointer text-xl text-gray-600 hover:text-blue-600" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ Responsive join card: full width on mobile, fixed on large */}
        <div className="w-full lg:w-[23%] flex justify-center">
          <div className="bg-[#F1813B] text-white rounded-lg p-6 flex flex-col justify-between lg:w-[300px] h-[450px] mt-1">
            <div>
              <h3 className="font-semibold text-lg mb-3">You can be here</h3>
              <p className="text-sm">
                We value curiosity, collaboration, and a can-do attitude. Oh, and coffee—lots of coffee.
                Come join a team that celebrates your unique skills and helps you unlock your full potential.
              </p>
            </div>
            <button className="bg-black text-white mt-6 rounded-lg p-2 text-sm hover:bg-gray-900 transition-all">
              Join Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
