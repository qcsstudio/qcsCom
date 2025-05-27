import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { aisolutions } from '../ServiceContainer/WorkProcess/WorkProcessData'
import { WebBenifitsData3 } from '../WevDevServiceContainer/WebBenifitsData'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import { caseStudiesAi, crmStatsData } from '@/components/WebdeveServicesComponent/CasestudiesData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import Questions from '../ServiceContainer/Questions/Questions'
import { AiserviceFaq, UIUXServiceFaq } from '../ServiceContainer/Questions/faqsData'
import Form from '../ServiceContainer/FormContainer/Form'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Platforms from '@/components/WebdeveServicesComponent/Platforms'
import { AiSlide1, AiSlide2, ImagesSlide2, ImagesSlide3 } from '../ServiceContainer/SliderContainer/SliderImages'


const AiserviceContainer = () => {
    return (
        <>
            <NavbarContainer data={{
                heading: "Your Business, Powered by Intelligence.",
                para: "We help startups, SMEs, and enterprises harness AI to drive smarter decisions, automate routine processes, and unlock scalable innovation. Whether you're just starting or scaling fast—well define, design, and deliver the right AI roadmap for you.",
                buttons: [{ text: "Book a Free AI Consultation", link: "#", color: "#F1813B", border: "none" }, { text: "See Use Cases", link: "#", color: "transparent", border: "1px solid gray" }]
            }} />
            <WorkProcess steps={aisolutions} />
            <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData3} />
            <Platforms heading="Tech Stack We Work On" para="We work on powerful, popular, customisable and scalable platforms to deliver the best solutions for our clients." images={AiSlide1} />
            <Platforms images={AiSlide2} />
            <CaseStudies data={caseStudiesAi} data2={crmStatsData} />
            <Questions questions={AiserviceFaq} />
            <Form heading="Ready to Explore AI for Your Business?"
                desc="Start small. Scale smart. Let QuantumCrafters help you unlock automation, intelligence, and impact with tailored AI strategies." />
            <ContactSection />
            <Footer />

        </>
    )
}

export default AiserviceContainer