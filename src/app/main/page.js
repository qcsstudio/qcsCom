import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import PlatformComponent from '@/components/MainComponent/PlatformComponent'
import Solutions from '@/components/MainComponent/Solutions'
import Footer from '@/containers/FooterContainer/Footer'
import Form from '@/containers/FormContainer/Form'
import NavbarContainer from '@/containers/NavbarContainer/NavbarContainer'
import ClientStories from '@/containers/Stories/Clientstories'
import React from 'react'

const page = () => {
  return (
    <>
      <NavbarContainer data={{heading:"Automate Your Business. Scale with Smart SaaS. Achieve Career Excellence",
        para:"QuantumCrafters Studio is your partner in digital transformation powering businesses with AI-driven IT solutions",
        buttons:[{text:"Reach out to Expert Now",link:"#",color:"#F1813B"},]}}/>

      <PlatformComponent/>
      {/* <Solutions/> */}

      <ClientStories />
      <Form heading="Have a Query? Let’s Talk!!"/>
      <NewsletterSignup/>
      <Footer/>

    </>
  )
}

export default page