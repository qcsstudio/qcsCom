import Heading from "@/components/HeadingComponent/Heading";
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import { Unbounded ,Syne} from "next/font/google";
import { PiPuzzlePieceBold } from "react-icons/pi";


const syne = Syne({subsets:['latin'],weight:"400"})
const unbounded = Unbounded({subsets:['latin'],weight:"700"})
const Differences = ({heading,heading2,challenges,solutions,bgcolor,bgcolor2,textColor,textColor2,iconcolor,iconcolor2}) => {
  
  return (
    <>
    <IconNtext text="Our Differences" link="/images/Icons/Differences.png"/>
      <Heading heading="Business Challenges & Innovative Solutions"/>
    <div className="flex flex-col items-center  ">   
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <div className=" p-2 sm:p-6 flex-1  rounded-l-3xl " style={{backgroundColor:`${bgcolor}`,color:`${textColor}`}}>
          <h3 className={`text-2xl text-center sm:text-start  lg:text-start sm:text-[26px] font-bold mb-4 ${unbounded.className}`}>{heading}</h3>
          <ul className="space-y-3">
            {challenges.map((challenge, index) => (
              <li key={index} className={`flex items-start font-medium text-base text-wrap ${syne.className}`}>
                <PiPuzzlePieceBold size={16} className={` mr-2 mt-1 ${bgcolor === "black" ? "text-[#F1813B]" : "text-[gray]" }`}/>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black text-white rounded-lg mt-4 lg:mt-0 md:rounded-r-3xl md:rounded-l-none p-2 sm:p-6 flex-1"
        style={{backgroundColor:`${bgcolor2}`,color:`${textColor2}`}}>
          <h3 className={`text-2xl text-center sm:text-start  lg:text-start sm:text-[26px] font-bold mb-4 ${unbounded.className}`}>{heading2}</h3>
          <ul className="space-y-3">
            {solutions.map((solution, index) => (
              <li key={index} className={`flex items-start font-medium text-base ${syne.className}`}>
                <PiPuzzlePieceBold size={16} className={` ${bgcolor2 === "black" ? "text-[#F1813B]" : "text-[gray]" } mr-2 mt-1 `} />
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default Differences;