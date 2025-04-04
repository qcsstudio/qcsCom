import React from 'react'

const Imagescomp = ({ images }) => {
  return (
    <img 
      src={images}
      className="w-full md:w-[30%] h-auto object-cover"
      alt="image"
    />
  )
}

export default Imagescomp
