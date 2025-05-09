import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import Form from '../ServiceContainer/FormContainer/Form'
import Ourstory from '@/components/AboutusComponent/OurStory'
import OurValues from '@/components/AboutusComponent/OurValues'
import Moments from '@/components/AboutusComponent/Moments'
import VisionMissionCards from '@/components/AboutusComponent/VisionMissionCards'
import AboutUs from '../ServiceContainer/AboutUs/AboutUS'

const AboutusContainer = () => {
    return (
        <>
            <NavbarContainer data={{
                heading: "IT Solutions and Tech Education For Your Growth",
                para: "At QuantumCrafters Studio, we're not just building technology—we're crafting stories of transformation. We began with a simple belief: education should unlock potential, not limit it, and AI should empower, not overwhelm."
            }} />
            <Ourstory/>
            <VisionMissionCards/>
            <OurValues/>
            <Moments/>
            <AboutUs />
            {/* <Form
                heading="Let's Co-Create the Future"
                desc="Whether you're a student looking to stand out, a college seeking industry-edge partnerships, or a business ready for AI-powered growth QuantumCrafters is your tribe." /> */}
            <NewsletterSignup />
            <Footer />
        </>
    )
}

export default AboutusContainer