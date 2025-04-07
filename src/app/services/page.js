import Images from '@/containers/Iamgescontainer/Images'
import ServicesContainer from '@/containers/OurServices/ServicesContainer'
import React from 'react'
import Form from '@/containers/FormContainer/Form'
import Footer from '@/containers/FooterContainer/Footer'
import Differences from '@/containers/OurDifferences/Differences'
import Benifits from '@/containers/BenifitsContainer/Benifits'
import WorkProcess from '@/containers/WorkProcess/WorkProcess'
import AboutUs from '@/containers/AboutUs/AboutUS'
import Questions from '@/containers/Questions/Questions'
import ClientStories from '@/containers/Stories/Clientstories'
import ContactSection from '@/containers/ContactUs/Contactus'
import NavbarContainer from '@/containers/NavbarContainer/NavbarContainer'
import BrandsContainer from '@/containers/BrandsContainer/BrandsContainer'

const page = () => {
  return (
    <>
      <NavbarContainer />
      <Images />
      <BrandsContainer />
      <Benifits />
      <ServicesContainer />
      {/* <WorkProcess /> */}
      <Differences />
      <ClientStories />
      <Questions />
      <AboutUs />
      <Form />
      <ContactSection />
      <Footer />
    </>
  )
}

export default page