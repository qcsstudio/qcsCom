import React from 'react'
import Link from 'next/link'

const WeAre = () => {
  return (
    <>
    <div className=' mt-10 bg-[#F5F7F9] rounded-xl  p-20 font-sans'>
        <h3 className='text-3xl font-bold  text-[#F1813B] font-syne'>Who We Are ?</h3>
        <p className=' text-xl font-normal mt-3 text-[#00000]'>QuantumCrafters Studio is a forward-thinking 
            tech company empowering startups, SMEs, and students through AI-powered IT services, intelligent 
            SaaS solutions, and hands-on career training. From smart tools like ElevatrX to practical courses
             in Web Development, Digital Marketing, and AI, we bridge the gap between innovation and 
             real-world impact—shaping smarter  businesses and future-ready professionals.
        </p>
        <Link href="/aboutus">
        <button className='float-right text-base font-medium text-[#F1813B]  p-2 px-5 rounded-lg mb-10'>Read more</button>
    </Link>
    </div>
    
    </>
  )
}

export default WeAre