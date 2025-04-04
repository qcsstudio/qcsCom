
import { FaPlus, FaPercent} from "react-icons/fa";


export default function Brands() {
     const stats = [
        { value: "250", sign: <FaPlus />, label: "Projects Delivered", desc: "We've successfully completed over 250 projects—and we're just getting started!" },
        { value: "70", sign:<FaPercent /> , label: "Business Growth", desc: "Our strategies have helped clients achieve up to 70% revenue growth in just one year!" },
        { value: "500", sign: <FaPlus />, label: "Happy Clients", desc: "More than 500 satisfied clients trust us to bring their ideas to life." }
    ];
    

  return (
   <>
      <h1 className="text-4xl w-[85%] mx-auto text-center font-bold mt-10 ">
        Building brands, boosting businesses, and redefining possibilities Let's grow your brand together.
      </h1>
      
      <div className='w-[85%]  m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-evenly  gap-10 my-10 '>
        {stats.map((stat, index) => (
          <div key={index} className=" p-0">
            <div className="border border-dashed h-[142px] m-auto  bg-[#F5F7F9] text-start px-5 box-border rounded-[30px] border-gray-500">
              <h2 className="text-[74px] flex font-medium  text-gray-900">
                {stat.value}<span className="text-[#F1813B] text-2xl items-center ms-1 flex">{stat.sign}</span>
              </h2>  
              <h3 className="text-2xl font-medium -mt-4 ">{stat.label}</h3>
          </div>
            

              <p className="mt-2 text-base px-5 text-[#000000]">{stat.desc}</p>
            
            </div>
        ))}
      
    </div>
    </>
  );
}

