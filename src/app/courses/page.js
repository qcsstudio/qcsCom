import Choices from '@/components/CoursesComponent/Choices'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import AboutUs from '@/containers/AboutUs/AboutUS'
import Footer from '@/containers/FooterContainer/Footer'
import Form from '@/containers/FormContainer/Form'
import NavbarContainer from '@/containers/NavbarContainer/NavbarContainer'
import ServicesContainer from '@/containers/OurServices/ServicesContainer'
import ClientStories from '@/containers/Stories/Clientstories'
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
        <Form heading="Ready to Launch Your Tech Career?" desc="Contact Us Today!"/>
        <NewsletterSignup/>
        <Footer/>
        
    </>
  )
}

export default page