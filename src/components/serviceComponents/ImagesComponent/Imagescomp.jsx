import React from 'react'
import Image from 'next/image'

const Imagescomp = ({ images }) => {
  return (
    <Image 
      src={images}
      className="w-full md:w-[30%]  object-cover"
      alt="image"
      width={389}
      height={540}
    />
  )
}

export default Imagescomp
