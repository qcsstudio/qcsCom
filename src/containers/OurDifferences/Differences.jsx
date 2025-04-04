
import { PiPuzzlePieceBold } from "react-icons/pi";

const challenges = [
  "Repetitive manual processes draining productivity",
  "Complex systems creating operational bottlenecks",
  "Limited data insights hindering informed decisions",
  "Difficulty scaling efficiently",
  "Low digital presence reducing market impact",
];

const solutions = [
  "Robust automation tools to dramatically reduce manual work",
  "Integrated AI solutions streamlining technology stacks",
  "Powerful predictive analytics for data-driven strategic insights",
  "Scalable AI infrastructure designed for rapid growth",
  "Result-oriented digital marketing for increased visibility",
];

const Differences = ()=> {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className=' w-[152px] mx-auto mb-6 '>
                    <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
                        <img src='/images/Images/servicesLogo.png' />
                        <span className=' font-semibold text-sm mt-1 '>Our Differences</span>
                    </h4>
                </div>
      <h2 className="text-5xl font-bold text-center mb-6">
        Business Challenges & Innovative Solutions
      </h2>
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <div className="bg-[#F5F7F9]  p-6 flex-1  rounded-l-3xl ">
          <h3 className="text-[26px] font-bold mb-4">Common Challenges Businesses Face:</h3>
          <ul className="space-y-3">
            {challenges.map((challenge, index) => (
              <li key={index} className="flex items-start font-medium text-base text-wrap">
                <PiPuzzlePieceBold size={16} className="text-gray-500 mr-2 mt-1" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black text-white  rounded-r-3xl p-6 flex-1">
          <h3 className="text-[26px] font-bold mb-4">QuantumCrafters’ Cutting-Edge Solutions:</h3>
          <ul className="space-y-3">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start font-medium text-base">
                <PiPuzzlePieceBold size={16} className="text-[#F1813B] mr-2 mt-1" />
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