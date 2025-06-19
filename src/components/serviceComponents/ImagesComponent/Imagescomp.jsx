import React from 'react'
import Image from 'next/image'

const Imagescomp = ({ images }) => {
  return (
    <Image 
      src={images}
      className=" object-contain"
      alt="image"
      width={389}
      height={540}
    />
  )
}

export default Imagescomp
