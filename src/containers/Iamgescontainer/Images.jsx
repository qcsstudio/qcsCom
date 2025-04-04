import Imagescomp from '@/components/ImagesComponent/Imagescomp'
import React from 'react'

const Images = () => {
  return (
    <div className='w-[95%] m-auto flex flex-wrap justify-center gap-5 my-10'>
        <Imagescomp images="images/Images/Image1.png"/>
        <Imagescomp images="images/Images/Image2.png"/>
        <Imagescomp images="images/Images/Image3.png"/>
    </div>
  )
}

export default Images
