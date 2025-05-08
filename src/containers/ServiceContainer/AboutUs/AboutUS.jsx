import { FaLinkedin, FaTimes } from "react-icons/fa";
import Link from "next/link";

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
    position: " Human Resources Manager",
    link: "https://www.linkedin.com/in/sheetal-rani-"
  },

]

const AboutUs = () => {
  return (
    <div id="aboutus" className="max-w-6xl  mx-auto py-16 px-6 ">
      <div className=' w-[138px] mx-auto my-6 '>
        <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
          <img src='/images/Images/servicesLogo.png' />
          <span className=' font-semibold text-sm mt-1 '>About US</span>
        </h4>
      </div>
      <h1 className="text-center font-bold text-4xl mb-6">Our Stories & Team</h1>
      <p className="text-[#000000] font-medium text-xl  mx-auto mb-4">
        We started as a small group of passionate creators who believed that great ideas deserve bold execution.
        What began over coffee-fueled brainstorming sessions has grown into a thriving digital agency dedicated
        to helping brands stand out.
      </p>
      <p className="text-[#000000] font-medium text-xl mx-auto mb-12">
        Our mission is simple: to craft creative, impactful solutions that drive results. With a vision to empower
        businesses to shine in a crowded world, we combine strategy, design, and a touch of magic to bring your
        ideas to life. Let's make something amazing together!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-1 text-center shadow-md">

            <img src={member.image} className="w-full h-[352px] rounded-lg" />

            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{member.position}</p>
            <div className="flex justify-center gap-3 text-gray-700">
              <Link href={member.link}>
                <FaLinkedin className="cursor-pointer text-xl" />
              </Link>
              {/* <FaTimes className="cursor-pointer text-xl" /> */}
            </div>
          </div>
        ))}
        <div className="bg-[#F1813B] text-white rounded-lg p-6 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="font-semibold text-lg mb-3">You can be here</h3>
            <p className="text-sm">
              We value curiosity, collaboration, and a can-do attitude. Oh, and coffee—lots of coffee.
              Come join a team that celebrates your unique skills and helps you unlock your full potential.
            </p>
          </div>
          <button className="bg-black text-white mt-6 rounded-lg p-2 text-sm">Join Our Team</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;