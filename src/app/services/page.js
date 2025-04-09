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
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import NavbarContainer from '@/containers/NavbarContainer/NavbarContainer'
import BrandsContainer from '@/containers/BrandsContainer/BrandsContainer'

const page = () => {
  return (
    <>
      <NavbarContainer data={{heading:"Unlock Growth with Next-Gen AI & Automation Solutions",
        para:"Transform your business operations through strategic automation, advanced machine learning, and personalized AI consulting.",
        buttons:[{text:"Get Started",link:"#",color:"#F1813B",border:"none"},{text:"Explore Services",link:"#",color:"transparent",border:"1px solid gray"}]}}/>
      <Images />
      <BrandsContainer />
      <Benifits />
      <ServicesContainer />
      {/* <WorkProcess /> */}
      <Differences />
      <ClientStories />
      <Questions />
      <AboutUs />
      <Form heading="Need a custom quote?" desc="Don't let your ideas sit idle—slide
        into our inbox and let's make magic!"/>
      <ContactSection />
      <Footer />
    </>
  )
}

export default page