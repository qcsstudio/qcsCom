import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import {  Digitalsolutions } from '../ServiceContainer/WorkProcess/WorkProcessData'
import { WebBenifitsData3 } from '../WevDevServiceContainer/WebBenifitsData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import { caseStudiesAi, caseStudiesDigital, crmStatsData } from '@/components/WebdeveServicesComponent/CasestudiesData'
import Questions from '../ServiceContainer/Questions/Questions'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import { AiserviceFaq, DigitalserviceFaq } from '../ServiceContainer/Questions/faqsData'
import Form from '../ServiceContainer/FormContainer/Form'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'

const Digitalservice = () => {
  return (
    <>
    <NavbarContainer data={{
                heading: "Growth That’s Smarter, Not Harder.",
                para: "Our digital marketing services combine data, creativity, and automation to help you reach the right audience, at the right time, with the right message—across organic and paid channels.",
                buttons: [{ text: "Request a Free Marketing Audit", link: "#", color: "#F1813B", border: "none" }, { text: "Book Strategy Call", link: "#", color: "transparent", border: "1px solid gray" }]
            }} />
            <WorkProcess steps={Digitalsolutions} />
            <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData3} />
            <CaseStudies data={caseStudiesDigital} data2={crmStatsData} />
            <Questions questions={DigitalserviceFaq} />
            <Form heading=" Let’s Accelerate Your Growth"
                desc="Let’s turn your brand into a lead magnet. With the right mix of content, ads, and automation—we’ll make your marketing work harder (and smarter)." />
            <ContactSection />
            <Footer />
    
    </>
  )
}

export default Digitalservice