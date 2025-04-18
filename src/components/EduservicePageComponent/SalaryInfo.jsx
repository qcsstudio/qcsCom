import React from "react";

const SalaryInfo = () => {
  const cards = [
    {
      title: "Avg. Entry Salary",
      value: "₹3.5-6 LPA",
    },
    {
      title: "Experienced Roles",
      value: "₹8-15 LPA",
    },
    {
      title: "Global Freelancing",
      value: "$25-$80/hr",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 mt-5 ">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#F5F7F9] text-center  py-6 rounded-xl w-[390px] "
        >
          <h3 className="text-3xl font-bold ">{card.title}</h3>
          <p className="text-3xl font-bold text-black">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SalaryInfo;
