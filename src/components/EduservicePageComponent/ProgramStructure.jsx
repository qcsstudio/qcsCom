import React from "react";

const ProgramStructure = () => {
  const cards = [
    {
      title: "Duration",
      points: ["5 to 7 Months", "Flexible", "Self-Paced + Mentorship"],
    },
    {
      title: "Mode",
      points: ["Offline", "In-House Mentoring"],
    },
    {
      title: "Certification",
      points: ["Design Proficiency Certificate", "Portfolio Review Badge"],
    },
    {
      title: "Eligibility",
      points: ["Beginners", "College Students", "Working Professionals"],
    },
  ];

  return (
    <div className="py-12 px-4 md:px-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Program Structure & Timeline
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#F5F7F9] rounded-2xl p-6 text-left  "
          >
            <div className="w-12 h-12 bg-[#CCCCCC]  mb-4"></div>
            <h3 className="text-2xl font-bold mb-3 text-[#0F0F0F]">{card.title}:</h3>
            <ul className="list-disc pl-5 space-y-1 text-lg text-[#000000] marker:text-[#F1813B]">
              {card.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramStructure;
