import Choices from '@/components/CoursesComponent/Choices'
import { coursesboxes } from '@/components/CoursesComponent/ChoicesboxData'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import { CardData, CourseLinkData } from '@/components/serviceComponents/ServicesComponent/CardData'
import { courses } from '@/components/serviceComponents/ServicesComponent/ListCompData'
import AboutUs from '@/containers/ServiceContainer/AboutUs/AboutUS'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import { HomeTestimonial } from '@/containers/ServiceContainer/Stories/TestimonialsData'
import React from 'react'

const page = () => {
  return (
    <>
      
        <NavbarContainer data={{heading:"IGNITE YOUR TECH PASSION LAUNCH YOUR DREAM CAREER",
          para:"Discover tech mentorship and education tailored to your interests, strengths, and goals. Whether you're into coding, design, data, or marketing, we help you align your passion with the right skills for real-world success.",
          buttons:[{text:"Enroll Now",link:"#",color:"#F1813B"},{text:"Explore Services",link:"#",color:"#transparent", border:"1px solid gray"}]}}/>

        <ServicesContainer listData={courses} ServiceCardData={CardData} links ={CourseLinkData}  />
        <Choices title="Why QuantumCrafter Studio is the right Choice for you" data={coursesboxes}/>
        <AboutUs/>
        <ClientStories heading="Success Stories: Real Results, Real Impact" testimonials={HomeTestimonial}/>
        <FormComponent heading="Ready to Launch Your Tech Career?" desc="Contact Us Today!"/>
        <NewsletterSignup/>
        <Footer/>
        
    </>
  )
}

export default page