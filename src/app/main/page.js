import LeaderComponent from '@/components/MainComponent/LearderComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import PlatformComponent from '@/components/MainComponent/PlatformComponent'
import Solutions from '@/components/MainComponent/Solutions'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import React from 'react'
import FormComponent from '@/components/MainComponent/FormComponent'


const page = () => {

  return (
    <>
      <NavbarContainer data={{heading:"Automate Your Business. Scale with Smart SaaS. Achieve Career Excellence",
        para:"QuantumCrafters Studio is your partner in digital transformation powering businesses with AI-driven IT solutions",
        buttons:[{text:"Reach out to Expert Now",link:"#",color:"#F1813B"},]}}/>

      <PlatformComponent/>
      <Solutions/>
      <LeaderComponent/>

      <ClientStories />
      <FormComponent heading="Have a Query? Let's Talk!!"  />
      <NewsletterSignup/>
      <Footer/>

    </>
  )
}

export default page