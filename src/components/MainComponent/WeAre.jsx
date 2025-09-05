
import React from 'react'
import Link from 'next/link'
import { Unbounded } from 'next/font/google'
import Heading from '../HeadingComponent/Heading'


const unbounded = Unbounded({ subsets: ['latin'], weight: '600' })

const WeAre = () => {




  return (
    <div className="w-[90%] mx-auto mt-10">

      {/* <div className='w-full h-screen border border-black relative'>
        <div className='w-[300px] h-[100px] absolute bottom-0 right-0 bg-[#ececec] z-50'></div>

      <spline-viewer url="https://prod.spline.design/HmOuhtKFDx2G8L3W/scene.splinecode" className="relative" ></spline-viewer>
      </div> */}

      <Heading heading="Who We Are ?" />

      <div className="bg-gray-50 rounded-xl mt-10 px-4 sm:p-6 sm:flex sm:gap-6">
        {/* Text Section */}
        <div className="sm:w-[75%] text-[#000000] text-xl space-y-4">
          <p className={`text-xl font-normal mt-10 text-[#000000] font-montserrat`}>
            QuantumCrafters Studio is a forward-thinking tech company empowering startups, SMEs, and students
            through AI-powered IT services, intelligent SaaS solutions, and hands-on career training. From
            smart tools like ElevatrX to practical courses in Web Development, Digital Marketing, and AI,
            we bridge the gap between innovation and real-world impact—shaping smarter businesses and
            future-ready professionals.
          </p>

          <Link href="/aboutus">
            <button className="whitespace-nowrap text-base font-medium hover:bg-[#F1813B] hover:text-white border border-[#F1813B] text-[#F1813B] py-2 px-5 rounded-lg mb-10">
              Read more
            </button>
          </Link>
        </div>

        {/* Image Placeholder */}
        <div className="sm:w-[25%] mt-6 sm:mt-0">
          <div className="w-full h-40 sm:h-full bg-[#D9D9D9] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default WeAre;
