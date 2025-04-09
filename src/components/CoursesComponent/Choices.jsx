import React from "react";

const Choices = () => {
  return (
    <div className="bg-white  py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-16">
          Why QuantumCrafter Studio is the right Choice for you
        </h2>

        {/* Custom Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Box 1 */}
          <div className="bg-[#F5F7F9] p-5 rounded-xl -md">
            <div className="bg-black w-14 h-14 rounded-full mb-2"></div>
            <h3 className="text-2xl font-bold leading-snug mb-2">
              Passion <br /> Driven Guidance
            </h3>
            <p className="text-[15px] text-[#000000]">
              We start by understanding your unique passions and career goals, aligning you with the perfect course to turn your interests into a thriving career.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-[#F5F7F9] p-5 rounded-xl -md">
            <div className="bg-black w-14 h-14 rounded-full mb-2"></div>
            <h3 className="text-2xl font-bold leading-snug mb-2">
              Expert <br /> Led Mentorship
            </h3>
            <p className="text-[15px] text-[#000000]">
              Learn from industry professionals who provide personalized feedback, real-world insights, and hands-on guidance to help you excel in your studies.
            </p>
          </div>

          {/* Box 3 - Tall box */}
          <div className="bg-[#F5F7F9] p-5 rounded-xl -md row-span-2 flex flex-col justify-between">
            <div>
              <div className="bg-black w-14 h-14 rounded-full mb-2"></div>
              <h3 className="text-2xl font-bold leading-snug mb-2">
                Career Ready <br /> Support
              </h3>
              <p className="text-[15px] text-[#000000] mb-2">
                Go beyond technical training with career-focused guidance, including resume-building, mock interviews, networking opportunities, and our 100% job placement guarantee to help you transition into the workforce.
              </p>

              <h4 className="font-bold text-2xl mt-10">
                Your Path to Tech Success Support
              </h4>
              <p className="text-[15px] text-[#000000] mt-4">
                Discover → Learn from Experts → Gain Hands-on Experience → Launch Your Career
              </p>
            </div>

            <button className="bg-[#F1813B] hover:bg-[#e4a882] text-white font-semibold text-sm py-2 px-4 rounded w-full">
              Upskill & Get Hired!
            </button>
          </div>

          {/* Box 4 - Wide box */}
          <div className="bg-[#F5F7F9] p-5 rounded-xl -md col-span-2">
            <div className="bg-black w-14 h-14 rounded-full mb-2"></div>
            <h3 className="text-2xl font-bold leading-snug mb-2">
              Immersive <br /> Practical Experience
            </h3>
            <p className="text-[15px] text-[#000000]">
              Develop in-demand skills through hands-on projects, real-world case studies, and interactive assignments that prepare you for industry challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choices;
