import { PiPuzzlePieceBold } from "react-icons/pi";

const Differences = ({title,heading,heading2,challenges,solutions,bgcolor,bgcolor2,textColor,textColor2,iconcolor,iconcolor2}) => {
  
  return (
    <div className="flex flex-col items-center p-8  ">
      <div className=' w-[152px] mx-auto mb-6 '>
        <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
          <img src='/images/Images/servicesLogo.png' />
          <span className=' font-semibold text-sm mt-1 '>Our Differences</span>
        </h4>
      </div>
      <h2 className=" text-5xl font-bold text-center mb-6">
        {title}
      </h2>
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <div className=" p-2 sm:p-6 flex-1  rounded-l-3xl " style={{backgroundColor:`${bgcolor}`,color:`${textColor}`}}>
          <h3 className=" text-2xl text-center sm:text-start  lg:text-start sm:text-[26px] font-bold mb-4">{heading}</h3>
          <ul className="space-y-3">
            {challenges.map((challenge, index) => (
              <li key={index} className="flex items-start font-medium text-base text-wrap">
                <PiPuzzlePieceBold size={16} className={` mr-2 mt-1 ${bgcolor === "black" ? "text-[#F1813B]" : "text-[gray]" }`}/>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black text-white rounded-lg mt-4 lg:mt-0 md:rounded-r-3xl md:rounded-l-none p-2 sm:p-6 flex-1"
        style={{backgroundColor:`${bgcolor2}`,color:`${textColor2}`}}>
          <h3 className="text-xl text-center sm:text-start  lg:text-start sm:text-[26px] font-bold mb-4">{heading2}</h3>
          <ul className="space-y-3">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start font-medium text-base">
                <PiPuzzlePieceBold size={16} className={` ${bgcolor2 === "black" ? "text-[#F1813B]" : "text-[gray]" } mr-2 mt-1 `} />
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Differences;