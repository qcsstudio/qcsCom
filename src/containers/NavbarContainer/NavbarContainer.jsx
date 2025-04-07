import Navbar from "@/components/serviceComponents/NavbarComponent/Navbar";
import Button from "@/components/serviceComponents/NavbarComponent/NavButton";

const NavbarContainer = () => {
  return (
    <div className="w-[98%] rounded-xl mt-4 mx-auto bg-black text-white flex flex-col items-center justify-center py-6 px-4">
      <Navbar
        heading="Unlock Growth with Next-Gen AI  & Automation Solutions"
        para="Transform your business operations through strategic automation, advanced machine learning, and personalized AI consulting."
      />
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button text={'Get Started'} color={'#F1813B'} />
        <Button text={'Explore Services'} color={'transparent'} border={`1px solid gray`} />
      </div>
    </div>
  );
};

export default NavbarContainer;
