import React from 'react';
import ListComp from '@/components/serviceComponent/ServicesComponent/ListComp'
import Scrollcomp from '@/components/serviceComponent/ServicesComponent/Scrollcomp'


const ServicesContainer = () => {
    return (
        <>
            <div className='w-[85%]  m-auto mt-10'>
                <div className=' w-[133px] mx-auto '>
                    <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
                        <img src='/images/Images/servicesLogo.png' />
                        <span className=' font-semibold text-sm mt-1 '>Our Services</span>
                    </h4>
                </div>
                <h1 className='w-[70%] m-auto text-center font-medium text-4xl mt-5 '>
                    Services designed to help your brand shine brighter.</h1>
                <div className=' flex p-2 mt-5'>
                    <ListComp/>
                    <Scrollcomp/>
                </div>

            </div>
        </>
    )
}

export default ServicesContainer