import Image from "next/image";

const VisionMissionCards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-6 bg-white w-[85%] mx-auto">
      {/* Vision Card */}
      <div className="bg-black text-white rounded-xl p-6 flex flex-col  md:w-96 h-48 lg:w-[596px] py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-[40px] font-bold">Our Vision</h2>
          <Image
            src="/images/Images/vision.png"
            width={100}
            height={100}
            alt="vision icon"
          />
        </div>
        <p className="text-lg ">
          Scaling <span className="font-semibold text-xl">Expectations</span>
        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-black text-white rounded-xl p-6 flex flex-col  md:w-96 h-48 lg:w-[596px] py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-[40px] font-bold">Our Mission</h2>
          <Image
            src="/images/Images/mission.png"
            width={100}
            height={100}
            alt="mission icon"
          />
        </div>
        <p className=" text-lg ">
          Adapting to a global customer <br />
          community with a culturally diverse workforce.
        </p>
      </div>
    </div>
  );
};

export default VisionMissionCards;
