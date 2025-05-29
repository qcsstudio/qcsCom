"use client"
import React, { useContext, useEffect } from 'react'
import Choices from '@/components/CoursesComponent/Choices'
import { coursesboxes } from '@/components/CoursesComponent/ChoicesboxData'
import CoursesHeader from '@/components/CoursesHeader/CoursesHeader'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import AboutUs from '@/containers/ServiceContainer/AboutUs/AboutUS'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import { HomeTestimonial } from '@/containers/ServiceContainer/Stories/TestimonialsData'
import { usePathname } from 'next/navigation';
import  { cardcontext } from '@/context/scrollcardcontext';

const CoursesContainer = () => {

     const pathname = usePathname();
    const currPath = pathname.split("/")[1];
  
    const {setScrollCardData} = useContext(cardcontext);
  
    useEffect(() => {
      if(currPath){
        setScrollCardData(currPath);
      }
    }, [currPath]);

  return (
    <>
     <CoursesHeader />
      <ServicesContainer />
      <Choices title="Why QuantumCrafter Studio is the right Choice for you" data={coursesboxes} />
      <AboutUs />
      <ClientStories heading="Success Stories: Real Results, Real Impact" testimonials={HomeTestimonial} />
      <FormComponent heading="Ready to Launch Your Tech Career?" desc="Contact Us Today!" />
      <NewsletterSignup />
      <Footer />

    
    </>
  )
}

export default CoursesContainer