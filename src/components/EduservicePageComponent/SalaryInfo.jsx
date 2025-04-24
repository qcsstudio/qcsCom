import React from "react";

const SalaryInfo = ({data}) => {


  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 mt-5 ">
      {data.map((card, index) => (
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
