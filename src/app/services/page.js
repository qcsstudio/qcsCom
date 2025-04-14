import Images from '@/containers/ServiceContainer/Iamgescontainer/Images'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import React from 'react'
import Form from '@/containers/ServiceContainer/FormContainer/Form'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import Differences from '@/containers/ServiceContainer/OurDifferences/Differences'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import WorkProcess from '@/containers/ServiceContainer/WorkProcess/WorkProcess'
import AboutUs from '@/containers/ServiceContainer/AboutUs/AboutUS'
import Questions from '@/containers/ServiceContainer/Questions/Questions'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import BrandsContainer from '@/containers/ServiceContainer/BrandsContainer/BrandsContainer'
import LeaderComponent from '@/components/MainComponent/LearderComponent'
import Slider from '@/containers/ServiceContainer/SliderContainer/Slider'
import { benefits } from '@/containers/ServiceContainer/BenifitsContainer/BenifitsData.jsx'
import { ImagesSlide } from '@/containers/ServiceContainer/SliderContainer/SliderImages'
import { steps } from '@/containers/ServiceContainer/WorkProcess/WorkProcessData'


const page = () => {
  return (
    <>
      <NavbarContainer data={{heading:"Unlock Growth with Next-Gen AI & Automation Solutions",
        para:"Transform your business operations through strategic automation, advanced machine learning, and personalized AI consulting.",
        buttons:[{text:"Get Started",link:"#",color:"#F1813B",border:"none"},{text:"Explore Services",link:"#",color:"transparent",border:"1px solid gray"}]}}/>
      <Images />
      <BrandsContainer />
      <Benifits  heading="See why partnering with us is the smartest move."
        BenefitsData={benefits}
      />
      <Slider images={ImagesSlide}/>
      <ServicesContainer />
      <WorkProcess steps={steps} />
      <Differences />
      <ClientStories />
      <LeaderComponent/>
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