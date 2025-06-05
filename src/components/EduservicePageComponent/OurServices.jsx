import React from "react";
import IconNtext from "../iconNtextComponent/IconNtext";
import Heading from "../HeadingComponent/Heading";
import { Syne, Unbounded } from "next/font/google";

const unbounded = Unbounded({subsets:['latin'],weight:'600'})
const syne = Syne({subsets:['latin'],weight:'400'})
const OurServices = ({ data, onEnrollClick }) => {

  return (
    <>
      <IconNtext text="Topics" link="/images/Icons/curriculam.png" />
      <Heading heading="What You'll Learn (Curriculum Overview)" />
      <div className="p-8 max-w-[90%] min-w-[90%] mx-auto" id="curriculum">
        <div className="grid md:grid-cols-3 gap-6">
          {data?.map((section, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h3 className={`text-[26px] font-bold mb-4 text-wrap ${unbounded.className}`}>{section.title}</h3>
              <ul className={`list-disc  space-y-2 text-[15px] marker:text-[#F1813B] ${syne.className}`}>
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-[#000000]">{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-[#F1813B] text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className={`text-[26px] font-bold mb-2 ${unbounded.className}`}>want to Learn ?</h3>
              <p className={`text-[15px] mb-4 ${syne.className}`}>
                Our instructors are not just teachers; they are seasoned professionals who bring years of industry experience to the classroom
              </p>
            </div>
            <button
              onClick={onEnrollClick}
              className={`bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-500 ${syne.className}`}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices
