"use client"
import React, { useContext, useEffect, useState } from 'react'
import Choices from '@/components/CoursesComponent/Choices'
import { coursesboxes } from '@/components/CoursesComponent/ChoicesboxData'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import AboutUs from '@/containers/ServiceContainer/AboutUs/AboutUS'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import { HomeTestimonial } from '@/containers/ServiceContainer/Stories/TestimonialsData'
import { usePathname } from 'next/navigation';
import { cardcontext } from '@/context/scrollcardcontext';
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import EnrollNowcomp from '@/components/CoursesComponent/EnrollNowcomp'

const CoursesContainer = () => {
  const pathname = usePathname();
  const currPath = pathname.split("/")[1];
  const { setScrollCardData } = useContext(cardcontext);

  const [showEnrollModal, setShowEnrollModal] = useState(false);

  useEffect(() => {
    if (currPath) {
      setScrollCardData(currPath);
    }
  }, [currPath]);

  return (
    <>
      <NavbarContainer
        data={{
          heading: "Ignite Your Tech Passion Launch Your Dream Carrer",
          para: "Discover tech mentorship and education tailored to your interests, strengths, and goals. Whether you're into coding, design, data, or marketing, we help you align your passion with the right skills for real-world success.",
          buttons: [
            {
              text: "Enroll Now",
              link: "", 
              color: "#F1813B",
              border: "none",
              action: () => setShowEnrollModal(true) 
            },
            {
              text: "Explore Services",
              link: "#",
              color: "transparent",
              border: "1px solid gray"
            }
          ],
          image:"/images/Hero Images/Heroimage-courses.png"
        }}
      />
      
      <ServicesContainer />
      <Choices title="Why QuantumCrafter Studio is the right Choice for you" data={coursesboxes} />
      {/* <AboutUs /> */}
      <ClientStories heading="Success Stories: Real Results, Real Impact" testimonials={HomeTestimonial} />
      <FormComponent heading="Ready to Launch Your Tech Career?" desc="Contact Us Today!" />
      <NewsletterSignup />
      <Footer />

      {/* Modal Render */}
      {showEnrollModal && <EnrollNowcomp onClose={() => setShowEnrollModal(false)} />}
    </>
  )
}

export default CoursesContainer
