import React from "react";
import Image from "next/image";

const values = [
  {
    title: "Empathy First:",
    description: "We listen deeply before we teach or build",
    icon: "/images/Images/valueImages1.png",
  },
  {
    title: "Authenticity:",
    description: "We never fake transformation—we guide it",
    icon: "/images/Images/valueImages2.png",
  },
  {
    title: "Purpose Led Innovation:",
    description: "Tech is just a tool, people are the real product",
    icon: "/images/Images/valueImages3.png",
  },
  {
    title: "Growth for All:",
    description:
      "Every learner, mentor, intern, and client should grow with us",
    icon: "/images/Images/valueImages5.png",
  },
  {
    title: "Craftsmanship:",
    description:
      "Whether it's a UI or a curriculum we craft with intention",
    icon: "/images/Images/valueImages4.png",
  },
];

const OurValues = () => {
  return (
    <section className="py-12 bg-white text-black w-[85%] mx-auto">
      <h2 className="text-4xl font-bold  text-center mb-10">Our Values</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 max-w-7xl mx-auto">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-[#F5F7F9] p-4 rounded-2xl h-[295px]  "
          >
           <Image src={value.icon} width={50} height={60} alt={value.icon}  />
            <h3 className="font-medium text-2xl text-[#030204] mb-6 mt-3 h-[41px]">{value.title}</h3>
            <p className="text-xl text-[#030204">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;
