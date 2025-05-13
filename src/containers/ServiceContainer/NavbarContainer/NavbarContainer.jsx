import Navbar from "@/components/serviceComponents/NavbarComponent/Navbar";
import Button from "@/components/serviceComponents/NavbarComponent/NavButton";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({subsets: ['latin'],weight: '400'})
const NavbarContainer = ({data}) => {
  const {buttons} = data
  return (
    <div className="w-[98%] h-[603px] rounded-xl mt-4 mx-auto bg-black text-white flex flex-col px-4">
      <Navbar
        heading={data.heading}
        para={data.para}
      />
      <div className={`my-6 flex flex-wrap gap-4 justify-center ${unbounded.className}`}>
        {buttons?.map((item,index)=>{
          return <Button key={index} text={item.text} color={item.color} border={item.border} />
        })}
        
        
      </div>
    </div>
  );
};

export default NavbarContainer;
