import Image from 'next/image'
import React from 'react'

const IconNtext = ({text,link}) => {
  return (
    <div className='my-10'>
        <div className="flex justify-center items-center">
        <div className="flex gap-[10px]  rounded-[20px] h-[36px] w-auto bg-gray-200 ">
          <Image src={link} alt="Services Logo" width={29} height={29} className="mt-[4px] ml-[3px] w-[29px] h-[29px]" />
          <div className='flex m-auto justify-start font-semibold pr-3 text-[15px]'>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconNtext