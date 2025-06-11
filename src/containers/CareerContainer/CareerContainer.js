import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import CareerJobsComponent from '@/components/CareerJobsComponent/CareerJobsComponent'
import Footer from '../ServiceContainer/FooterContainer/Footer'

const CareerContainer = () => {
  return (
    <>
            <div className='h-full'>
        <NavbarContainer  data={{
            heading: "Become a part of QCS Family",
            para: "At QuantumCrafter Studio, we're not just building IT solutions we're shaping the future of digital experiences. From software development and UI/UX design to data driven marketing and innovative institutional solutions, our team thrives on collaboration, creativity, and continuous learning.",
            image:"/images/Hero Images/Career.png"
        }} />
        </div> 
        <CareerJobsComponent />     
        <Footer />
    </>
  )
}

export default CareerContainer