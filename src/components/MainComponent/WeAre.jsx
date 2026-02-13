
import React from 'react'
import Link from 'next/link'
import { Unbounded } from 'next/font/google'
import Heading from '../HeadingComponent/Heading'


const unbounded = Unbounded({ subsets: ['latin'], weight: '600' })

const WeAre = () => {




  return (
    <div className="w-[90%] mx-auto mt-10">

      {/* <div className='w-full h-screen relative'>
        <div className='w-[300px] h-[100px]  absolute bottom-0 right-0 bg-[#ececec] z-50'></div>
        <div className='w-full h-full  absolute z-100' />
        <div className='border border-black w-[200px] h-[200px] absolute z-101 top-10'>
          <div className="w-full lg:w-[50%] xl:w-[51%] flex flex-col justify-center text-black sm:mt-[25rem] md:mt-[0rem] min-[320px]:mt-[20rem]">

            <motion.h1
              className={`text-3xl  min-[1280px]:text-[55px] lg:text-[46px] md:text-[40px]   font-bold leading-tight font-unbounded`}
              style={{
                mixBlendMode: "overlay"

              }}

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {heading}
            </motion.h1>

            <motion.h2

              className={`text-3xl min-[1280px]:text-[65px] lg:text-[46px] md:text-[40px] sm:text-3xl  xl:w-[49%]
               min-[1262px]:w-[45%] min-[1146px]:w-[45%] min-[1033px]:w-[45%] min-[1024px]:w-[43%] min-[1015px]:w-[45%]
                min-[917px]:w-[45%] min-[977px]:w-[43%] min-[894px]:w-[42.39%] min-[882px]:w-[42%] min-[865px]:w-[43%] 
                min-[768px]:w-[42%] min-[1123px]:w-[40%] min-[733px]:w-[95%] min-[709px]:w-[100%] min-[693px]:w-[90%]
                 min-[640px]:w-[95%] min-[601px]:w-[95%] min-[516px]:w-[94%] min-[506px]:w-[95%] min-[489px]:w-[95%] 
                 min-[497px]:w-[90%] min-[401px]:w-[90%] min-[427px]:w-[95%] min-[417px]:w-[93%] min-[1145px]:w-[40%]
                  min-[345px]:w-[90%] min-[361px]:w-[92%] z-[-1] absolute md:top-[0] sm:top-[25rem] 
                  min-[320px]:top-[20rem] font-bold leading-tight font-unbounded`}


              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {heading}
            </motion.h2>

            <motion.p
              className={`mt-2 text-lg lg:text-[17px] xl:text-[19px] xl:w-[90%] text-start leading-tight font-montserrat`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              {para}
            </motion.p>

            <motion.div
              className="mt-4 flex flex-wrap gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            >
              {buttons?.map((btn, i) => (
                <div key={i} className='font-montserrat'>
                  {btn.action ? (
                    <button
                      onClick={btn.action}
                      style={{ backgroundColor: btn.color, border: btn.border }}
                      className="hover:bg-[rgb(241,129,59)]  px-6 py-2 text-sm sm:text-[16px] cursor-pointer rounded-md transition-colors duration-200"
                    >
                      {btn.text}
                    </button>
                  ) : (
                    <Button
                      text={btn.text}
                      color={btn.color}
                      border={btn.border}
                      link={btn.link}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>


        <spline-viewer url="https://prod.spline.design/HmOuhtKFDx2G8L3W/scene.splinecode" className="relative" ></spline-viewer>
      </div> */}





      {/* <spline-viewer url="https://prod.spline.design/dMG1wIjpkXPU75Q6/scene.splinecode"></spline-viewer>
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.56/build/spline-viewer.js"></script> */}
      {/* <spline-viewer url="https://prod.spline.design/dMG1wIjpkXPU75Q6/scene.splinecode"></spline-viewer> */}
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
