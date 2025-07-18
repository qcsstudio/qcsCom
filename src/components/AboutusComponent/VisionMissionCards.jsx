import Image from "next/image";

const VisionMissionCards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center my-10 bg-white w-[90%] mx-auto">
      {/* Vision Card */}
      <div className="bg-black text-white rounded-xl p-6 flex flex-col h-[290px] md:h-[400px] lg:h-[290px]   md:w-96  lg:w-[596px] xl:w-[800px] py-5">
        <div className="flex justify-between items-center">
          <h2 className={`text-[40px] font-bold font-unbounded`}>Our Vision</h2>
          <Image
            src="/images/Images/vision.png"
            width={100}
            height={100}
            alt="vision icon"
          />
        </div>
        <p className={`text-lg font-montserrat`}>
        To become a global catalyst for digital innovation and human potential—empowering businesses with intelligent technology and shaping the next generation of tech leaders through practical, real-world learning.

        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-black text-white rounded-xl p-6 flex flex-col  md:w-96 h-[290px] md:h-[400px] lg:h-[290px] lg:w-[596px] xl:w-[800px] py-5">
        <div className="flex justify-between items-center">
          <h2 className={`text-[40px] font-bold font-unbounded`}>Our Mission</h2>
          <Image
            src="/images/Images/mission.png"
            width={100}
            height={100}
            alt="mission icon"
          />
        </div>
        <p className={`text-lg font-montserrat`}>
        Our mission is to deliver smart, scalable IT and SaaS solutions that drive growth for
         startups and SMEs, while bridging the skill gap through hands-on, industry-aligned training 
         programs. We aim to transform how people learn, work, and grow—by blending innovation, expertise,
          and purpose.

        </p>
      </div>
    </div>
  );
};

export default VisionMissionCards;
