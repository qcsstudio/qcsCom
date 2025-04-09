import Navbar from "@/components/serviceComponents/NavbarComponent/Navbar";
import Button from "@/components/serviceComponents/NavbarComponent/NavButton";

const NavbarContainer = ({data}) => {
  const {buttons} = data
  return (
    <div className="w-[98%] rounded-xl mt-4 mx-auto bg-black text-white flex flex-col items-center justify-center py-6 px-4">
      <Navbar
        heading={data.heading}
        para={data.para}
      />
      <div className="my-6 flex flex-wrap gap-4 justify-center">
        {buttons.map((item,index)=>{
          return <Button key={index} text={item.text} color={item.color} border={item.border} />
        })}
        
        
      </div>
    </div>
  );
};

export default NavbarContainer;
