"use client";
import { IoMdPause } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay } from "swiper/modules"; 

const testimonials = [
  {
    name: "Omkar",
    title: "Backend Developer",
    quote:
      "I was initially hesitant about backend development, but joining QCS as a Backend Intern has been a game-changer. The hands-on experience and real-world projects have boosted my skills and confidence. I'm excited about the growth opportunities",
    image: "https://www.qcsstudio.in/_next/static/media/Omkar.d01374a0.png",
  },
  {
    name: "Navjot Kaur",
    title: "Frontend Developer",
    quote:
      "Starting my journey as a Frontend Developer Intern at QCS has been an incredible experience. Working on real projects has sharpened my skills and given me the confidence to create intuitive and engaging user interfaces. Excited to keep learning and growing here!",
    image: "https://www.qcsstudio.in/_next/static/media/Navjot.db611c2c.png",
  },
  {
    name: "Arshdeep Singh",
    title: "Frontend Developer",
    quote:
      "Joining QCS as a Frontend Developer Intern has been a game-changer. The exposure to real-world projects and guidance from the team have helped me level up my skills and build confidence in my work. Looking forward to more exciting challenges ahead!",
    image: "https://www.qcsstudio.in/_next/static/media/Arsh.88b04670.png",
  },
  {
    name: "Tobias Green",
    title: "FOUNDER, GREENSPARK INNOVATIONS",
    quote:
      "Working with this team felt like having a secret weapon. They took our scattered ideas and turned them into a website that screams 'wow!' Our customers can't stop raving about it!",
    image: "/images/Images/client1.png",
  },
  {
    name: "Silas Leighton",
    title: "MANAGING DIRECTOR, VENTUREVISTA",
    quote:
      "Finally, an agency that speaks our language! They understood our vision better than we did and brought it to life in a way that exceeded expectations. 10/10 would recommend!",
    image: "/images/Images/client2.png",
  },
  {
    name: "Orion Vance",
    title: "CEO, LUNAR LUX CO.",
    quote:
      "I came in with high hopes, and they absolutely blew me away. From strategy to execution, every detail was on point. I'm telling everyone I know—hire them!",
    image: "/images/Images/client3.png",
  },
  {
    name: "Vishal Verma",
    title: "Frontend Developer",
    quote:
      "QCS gave me the confidence and skills to land my dream job as a front-end developer. The hands-on projects and mentorship were invaluable",
    image: "https://www.qcsstudio.in/_next/static/media/Stu1.5070f1ca.png",
  },
  {
    name: "Pankaj",
    title: "Frontend Developer",
    quote:
      "Joining QCS as a Frontend Developer Intern has been an incredible journey. The hands-on projects and team support have significantly improved my coding and design skills. Looking forward to learning and growing even more!",
    image: "https://www.qcsstudio.in/_next/static/media/pankaj.2bb0dc70.png",
  },
  {
    name: "Aman Kashyap",
    title: "UI/UX Designer",
    quote:
      "I hesitated to switch careers, but QCS made the transition seamless. The program gave me the practical experience and portfolio I needed to land a UI/UX design role at a top company.",
    image: "https://www.qcsstudio.in/_next/static/media/Stu2.b57b14e1.png",
  },
  {
    name: "Callum Yates",
    title: "CO-FOUNDER, DRIFTWOOD MEDIA",
    quote:
      "Our brand went from a whisper to a roar. The team's creativity and expertise made all the difference. We're getting noticed like never before!",
    image: "/images/Images/client4.png",
  },
  {
    name: "Jasper Lowell",
    title: "CEO, COPPERLEAF ENTERPRISES",
    quote:
      "Our online presence went from zero to hero in no time. The team made the process so seamless, I almost forgot I was working on a big project!",
    image: "/images/Images/client5.png",
  },
  {
    name: "Jasper Lowell",
    title: "BRAND MANAGER, STELLAR BLOOM STUDIO",
    quote:
      "They made us feel like their most important client. The attention to detail, quick responses, and innovative ideas were top-notch. We'll definitely be back for more!",
    image: "/images/Images/client6.png",
  },
];


const ClientStories = () => {
  return (
    <>
      <h2 className="text-3xl lg:mt-10 sm:text-5xl w-full sm:w-[70%] mx-auto font-bold text-center">
        Success Stories: Real Results, Real Impact
      </h2>
      <div className="w-[85%] mx-auto text-center mb-16 mt-8">
        <Swiper
          modules={[Grid, Autoplay]} 
          grid={{ rows: 2, fill: "cols" }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            340:{ slidesPerView: 1, spaceBetween: 20},
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
                <p className="text-[#0F0F0F] text-left text-sm mt-4 ms-3">
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
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-xs text-[#0F0F0F]">{testimonial.title}</p>
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




