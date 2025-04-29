import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { steps3 } from '../ServiceContainer/WorkProcess/WorkProcessData'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import { WebBenifitsData3 } from '../WevDevServiceContainer/WebBenifitsData'
import CaseStudies from '@/components/WebdeveServicesComponent/CaseStudies'
import { caseStudiesData2, crmStatsData, } from '@/components/WebdeveServicesComponent/CasestudiesData'
import Questions from '../ServiceContainer/Questions/Questions'
import { UIUXServiceFaq } from '../ServiceContainer/Questions/faqsData'
import Form from '../ServiceContainer/FormContainer/Form'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import Footer from '../ServiceContainer/FooterContainer/Footer'

const UiUxService = () => {
    return (
        <>
            <NavbarContainer data={{
                heading: "Design That Connects, Converts & Captivates.",
                para: "We don't just design interfaces—we craft journeys. At QCS, our UI/UX team blends creativity with behavioral science to deliver intuitive, delightful, and high-converting user experiences across web and mobile platforms.",
                buttons: [{ text: "Book a Free Strategy Call", link: "#", color: "#F1813B" }, { text: "See Our Work", border: "1px solid gray" }]
            }} />
            <WorkProcess steps={steps3} />
            <Benifits heading="Key Features / Capabilities" BenefitsData={WebBenifitsData3} />
            <CaseStudies data={caseStudiesData2} data2={crmStatsData}/>
            <Questions questions={UIUXServiceFaq} />
            <Form heading=" Ready to Elevate Your Digital Experience?"
             desc="Let's design something unforgettable. We craft digital journeys your users will love—and your business will benefit from." />
            <ContactSection />
            <Footer />
        </>
    )
}

export default UiUxService