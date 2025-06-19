import Heading from '@/components/HeadingComponent/Heading'
import Imagescomp from '@/components/serviceComponents/ImagesComponent/Imagescomp'
import React from 'react'

const Images = () => {
  return (
    <>
 
      <Heading heading="From Vision to Reality - Explore Our Projects"/>
    <div className='w-[90%] mx-auto flex flex-wrap justify-evenly gap-5 my-10'>
        <Imagescomp images="/images/Images/Image1.png"/>
        <Imagescomp images="/images/Images/Image2.png"/>
        <Imagescomp images="/images/Images/Image3.png"/>
    </div>
    </>
  )
}

export default Images
