import { IoGlobeOutline } from "react-icons/io5";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-[98%]  rounded-xl mt-4 mx-auto bg-black text-white flex flex-col items-center justify-center py-5 px-4">
      <nav className="w-full flex justify-between items-center py-4 px-8">
        <div className="  text-black px-2 py-1   rounded-md flex">
          <div>

          <img src='/images/Images/QcsLogo.png' alt="logo" width={57} height={40} />
          </div>
          <h1 className="text-[#FFFFFF] text-base font-semibold leading-tight ms-2">Quantam Crafters<br/> Studio</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="hover:text-gray-400">Services</Link>
          <Link href="#" className="hover:text-gray-400">Projects</Link>
          <Link href="#" className="hover:text-gray-400">About Us</Link>
          <Link href="#" className="hover:text-gray-400">Blogs</Link>
          <Link href="#" className="hover:text-gray-400">Contact Us</Link>
        </div>
        <div className="flex items-center space-x-4 gap-2">
          <div className="flex">
          <IoGlobeOutline className="w-5 h-5 text-white me-1" />En
          </div>
          
          <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black">
            Get a Quote
          </button>
        </div>
      </nav>
      
      <div className="text-center py-4  px-5 mt-36"> 
        <h1 className="text-6xl md:text-5xl font-bold">
          Unlock Growth with Next-Gen AI  & Automation Solutions
        </h1>
        <p className="text-[#FFFFFF] mt-4 max-w-xl mx-auto">
          Transform your business operations through strategic automation, advanced machine learning, 
          and personalized AI consulting.
        </p>
        <div className="mt-6 flex space-x-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-1 text-lg rounded-md">
            Get Started
          </button>
          <button className="border border-white px-6 py-1 text-lg rounded-md
           hover:bg-white hover:text-black">
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;