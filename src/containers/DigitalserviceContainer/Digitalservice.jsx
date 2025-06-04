'use client'
import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { Digitalsolutions } from '../ServiceContainer/WorkProcess/WorkProcessData'
import { WebBenifitsData3 } from '../WevDevServiceContainer/WebBenifitsData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import { caseStudiesAi, caseStudiesDigital, crmStatsData } from '@/components/WebdeveServicesComponent/CasestudiesData'
import Questions from '../ServiceContainer/Questions/Questions'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import { AiserviceFaq, DigitalserviceFaq } from '../ServiceContainer/Questions/faqsData'
import Form from '../ServiceContainer/FormContainer/Form'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Platforms from '@/components/WebdeveServicesComponent/Platforms'
import { DigitalSlide1, DigitalSlide2 } from '../ServiceContainer/SliderContainer/SliderImages'
import { useCalendly } from '@/components/CalendlyBadge/CalendlyBadge';

const Digitalservice = () => {
  const openCalendly = useCalendly();

  return (
    <>
      <NavbarContainer data={{
        heading: "Future-Focused Digital Marketing Agency in India",
        para: "Boost Your Online Presence—Guaranteed Increases in Sales, Traffic, Revenue, and Customers",
        buttons: [{
          text: "Schedule Your Meeting Today",
          link: "/contactus",
          color: "#F1813B",
          border: "none",
           action: openCalendly,

        },
          // {
          //   text: " view work",
          //   link: "contactus",
          //   color: "transparent",
          //   border: "1px solid gray"
          // }
        ]
      }} />
      <WorkProcess steps={Digitalsolutions} />
      <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData3} />
      <Platforms heading="Tech Stack We Work On" para="We work on powerful, popular, customisable and scalable platforms to deliver the best solutions for our clients." images={DigitalSlide1} />
      <Platforms images={DigitalSlide2} />
      <CaseStudies data={caseStudiesDigital} data2={crmStatsData} />
      <Questions questions={DigitalserviceFaq} />
      <Form heading=" Let's Accelerate Your Growth"
        desc="Let's turn your brand into a lead magnet. With the right mix of content, ads, and automation—we'll make your marketing work harder (and smarter)." />
      <ContactSection />
      <Footer />

    </>
  )
}

export default Digitalservice