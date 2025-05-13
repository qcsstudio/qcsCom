import React from 'react'
import Link from 'next/link'
import { Syne, Unbounded } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: '400' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '600' })
const WeAre = () => {
  return (
    <>
     
     
        <div className="max-w-6xl mx-auto mt-10">
          <h3 className={`text-3xl font-bold text-center  ${unbounded.className}`}>Who We Are ?</h3>

          <div className="bg-gray-50 rounded-xl mt-10 p-6 sm:flex sm:gap-6">

            <div className="sm:w-[75%] text-[#000000] text-xl space-y-4 ">

              <p className={`text-xl font-normal mt-10 text-[#00000] ${syne.className}`}>QuantumCrafters Studio is a forward-thinking
                tech company empowering startups, SMEs, and students through AI-powered IT services, intelligent
                SaaS solutions, and hands-on career training. From smart tools like ElevatrX to practical courses
                in Web Development, Digital Marketing, and AI, we bridge the gap between innovation and
                real-world impact—shaping smarter  businesses and future-ready professionals.
              </p>
              <Link href="/aboutus">
                <button className=' text-base font-medium hover:bg-[#F1813B] hover:text-white border border-[#F1813B] text-[#F1813B] p-2 px-5 rounded-lg mb-10'>Read more</button>
              </Link>
            </div>


            <div className="sm:w-[25%] mt-6 sm:mt-0">
              <div className="w-full h-40 sm:h-full bg-[#D9D9D9] rounded-lg"></div>
            </div>
          </div>
        </div>


    </>
  )
}

export default WeAre

