'use client'
import React from 'react'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import Form from '../ServiceContainer/FormContainer/Form'
import Questions from '../ServiceContainer/Questions/Questions'
import { WebBenifitsData, WebBenifitsData2, webIndustries } from './WebBenifitsData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import {webdevSlide1, webdevSlide2 } from '../ServiceContainer/SliderContainer/SliderImages'
import Platforms from '@/components/WebdeveServicesComponent/Platforms'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { steps2 } from '../ServiceContainer/WorkProcess/WorkProcessData'
import { WebDevelopmentFaq } from '../ServiceContainer/Questions/faqsData'
import { caseStudiesData, crmStatsData } from '@/components/WebdeveServicesComponent/CasestudiesData'
import Industries from '@/components/WebdeveServicesComponent/Industries'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import { useCalendly } from '@/components/CalendlyBadge/CalendlyBadge';


const WebdevContainer = () => {
      const openCalendly = useCalendly(); // ✅ Correct usage
    return (
        <>
            <NavbarContainer data={{
                heading: "We Don't Just Build Web Apps. We Build Experiences That Perform.",
                para: "At QuantumCrafters Studio, we combine top-tier development with modern design and automation. We don't just deliver code—we build platforms that elevate brands, convert leads, and drive business outcomes.",
                buttons: [{ text: "Book a Free Strategy Call", link: "#", color: "#F1813B", border: "none", action: openCalendly, }],
                image: "/images/Hero Images/Heroimage-webservice.png"
            }} />
            <WorkProcess steps={steps2} />
            <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData} />
            <Platforms heading="Tech Stack We Work On" para="We work on powerful, popular, customisable and scalable platforms to deliver the best solutions for our clients." images={webdevSlide1} />
            <Industries heading="Industries We Dominate" Data={webIndustries} />
            <CaseStudies data={caseStudiesData} data2={crmStatsData} />
            <Questions questions={WebDevelopmentFaq} />
            <Form heading="Lets
                Build Something Powerful Together" desc="Your business deserves more than a basic website. Let us help you build a web experience that attracts, converts, and grows." />
            <ContactSection />
            <Footer />
        </>
    )
}

export default WebdevContainer