import Choices from '@/components/CoursesComponent/Choices'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import AboutUs from '@/containers/ServiceContainer/AboutUs/AboutUS'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import React from 'react'

const page = () => {
  return (
    <>
    
      <NavbarContainer data={{heading:"IGNITE YOUR TECH PASSION LAUNCH YOUR DREAM CAREER",
        para:"Discover tech mentorship and education tailored to your interests, strengths, and goals. Whether you're into coding, design, data, or marketing, we help you align your passion with the right skills for real-world success.",
        buttons:[{text:"Enroll Now",link:"#",color:"#F1813B"},{text:"Explore Services",link:"#",color:"#transparent", border:"1px solid gray"}]}}/>

        <ServicesContainer/>
        <Choices/>
        <AboutUs/>
        <ClientStories/>
        <FormComponent heading="Ready to Launch Your Tech Career?" desc="Contact Us Today!"/>
        <NewsletterSignup/>
        <Footer/>
        
    </>
  )
}

export default page