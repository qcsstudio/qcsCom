import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Map from '@/components/ContactusComponent/Map'
import ProposalForm from '@/components/ContactusComponent/ProposalForm'
import RecaptchaProvider from '@/providers/RecaptchaProvider'

const ContactusContainer = () => {
  return (
    <>
      <RecaptchaProvider>
        <NavbarContainer data={{
          heading: "Let's Connect & Craft the Future, Together!",
          para: "Talk to us over the phone or simply drop us an email to discuss your projects.",
          image: "/images/Hero Images/Contactus.png"
        }} />
        <ProposalForm />

        <Map />
        <Footer />
      </RecaptchaProvider>
    </>
  )
}

export default ContactusContainer