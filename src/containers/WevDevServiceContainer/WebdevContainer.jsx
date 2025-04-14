import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import Form from '../ServiceContainer/FormContainer/Form'
import Questions from '../ServiceContainer/Questions/Questions'
import { WebBenifitsData, WebBenifitsData2 } from './WebBenifitsData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import Slider from '../ServiceContainer/SliderContainer/Slider'
import { ImagesSlide2, ImagesSlide3 } from '../ServiceContainer/SliderContainer/SliderImages'
import Platforms from '@/components/WebdeveServicesComponent/Platforms'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { steps2 } from '../ServiceContainer/WorkProcess/WorkProcessData'


const WebdevContainer = () => {
    return (
        <>
            <NavbarContainer data={{
                heading: "We Don't Just Build Websites. We Build Experiences That Perform.",
                para: "At QuantumCrafters Studio, we combine top-tier development with modern design and automation. We don’t just deliver code—we build platforms that elevate brands, convert leads, and drive business outcomes.",
                buttons: [{ text: "Book a Free Strategy Call", link: "#", color: "#F1813B" }, { text: "See Our Work", border: "1px solid gray" }]
            }} />
            <WorkProcess steps={steps2}/>
            <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData} />
            <Platforms heading="Tech Stack We Work On" para="We work on powerful, popular, customisable and scalable platforms to deliver the best solutions for our clients." images={ImagesSlide2} />
            <Platforms images={ImagesSlide3} />
            <Benifits heading="Industries We Dominate" BenefitsData={WebBenifitsData2} />
            <CaseStudies />

            <Questions />
            <Form heading="Lets
                Build Something Powerful Together" desc="Your business deserves more than a basic website. Let us help you build a web experience that attracts, converts, and grows." />
            <ContactSection />
            <Footer />
        </>
    )
}

export default WebdevContainer