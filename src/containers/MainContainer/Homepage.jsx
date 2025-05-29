import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import PlatformComponent from '@/components/MainComponent/PlatformComponent'
import Solutions from '@/components/MainComponent/Solutions'
import LeaderComponent from '@/components/MainComponent/LearderComponent'
import ClientStories from '../ServiceContainer/Stories/Clientstories'
import FormComponent from '@/components/MainComponent/FormComponent'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import WeAre from '@/components/MainComponent/WeAre'
import { HomeTestimonial } from '../ServiceContainer/Stories/TestimonialsData'

const Homepage = () => {
  return (
    <>
      <NavbarContainer data=
        {{
          heading: "Automate Your Business. Scale with Smart SaaS. Achieve Career Excellence",
          para: "QuantumCrafters Studio is your partner in digital transformation powering businesses with AI-driven IT solutions",
          buttons: [{ text: "Reach out to Expert Now", link: "/contactus", color: "#F1813B" }]
        }}
      />

      {/* <PlatformComponent/> */}
      <WeAre />
      <Solutions />
      <LeaderComponent />

      <ClientStories heading="Hear Stories Straight From the People We Helped" testimonials={HomeTestimonial} />
      <FormComponent heading="Have a Query? Let's Talk!!" />
      <NewsletterSignup />
      <Footer />

    </>
  )
}

export default Homepage