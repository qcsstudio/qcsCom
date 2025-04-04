import Images from '@/containers/Iamgescontainer/Images'
import Brands from '@/containers/BrandsContainer/Brands'
import ServicesContainer from '@/containers/OurServices/ServicesContainer'
import React from 'react'
import Form from '@/containers/FormContainer/Form'
import Footer from '@/containers/FooterContainer/Footer'
import Differences from '@/containers/OurDifferences/Differences'

import Navbar from '@/containers/NavbarContainer/Navbar'
import Benifits from '@/containers/BenifitsContainer/Benifits'
import WorkProcess from '@/containers/WorkProcess/WorkProcess'
import AboutUs from '@/containers/AboutUs/AboutUS'
import Questions from '@/containers/Questions/Questions'
import ClientStories from '@/containers/Stories/Clientstories'
import ContactSection from '@/containers/ContactUs/Contactus'

const page = () => {
  return (
    <>
    
    <Navbar/>
    <Images/>
     <Brands/>
    <Benifits/>
     <ServicesContainer/>
     <WorkProcess/>
     <Differences/>
     <ClientStories/>
     <Questions/>
     <AboutUs/>
     <Form/>
     <ContactSection/>
     <Footer/>
    </>
  )
}

export default page