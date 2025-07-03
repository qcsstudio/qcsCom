'use client'
import React, { useState } from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import { DigitalMarketingreasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import { Digitalmarketingcurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import { Digitalroles, DigitalworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import Choices from '@/components/CoursesComponent/Choices'
import { Digitalcourseboxes } from '@/components/CoursesComponent/ChoicesboxData'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import Questions from '../ServiceContainer/Questions/Questions'
import { DigitalMarketFaq } from '../ServiceContainer/Questions/faqsData'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import EnrollNowcomp from '@/components/CoursesComponent/EnrollNowcomp'

const Digitalcards = [
    {
        title: "Avg. Entry Salary",
        value: "₹3.5-6.5 LPA",
    },
    {
        title: "Experienced Roles",
        value: " ₹8-12 LPA",
    },
    {
        title: "Global Freelancing",
        value: "  $20-50/hr ",
    },
];

const DigitalMarketProgram = [
    {
        title: "Duration",
        points: [" 4.5 to 6 Months (Self-Paced + Mentorship)"],
        image: "/images/Images/Uiprogram1.png"
    },
    {
        title: "Mode",
        points: ["Hybrid (Live + Recorded + Campus Events)"],
        image: "/images/Images/Uiprogram2.png"
    },
    {
        title: "Certification",
        points: [" Industry Credential + Project Portfolio"],
        image: "/images/Images/Uiprogram3.png"
    },
    {
        title: "Eligibility",
        points: [" UG/PG Students, Creators, Career Switchers"],
        image: "/images/Images/Uiprogram4.png"
    },

];
const DigitalMarketingContainer = () => {
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    return (
        <>
            <NavbarContainer data={{
                heading: "Become a Full-Funnel Digital Marketer. Learn, Launch & Lead Campaigns.",
                para: "Explore the world of modern marketing—from SEO to LinkedIn, from Google Ads to automation. Build your portfolio with real campaigns and drive measurable growth.",
                buttons: [{
                    text: "Enroll Now",
                    link: "#",
                    color: "#F1813B",
                    border: "none",
                    action: () => setShowEnrollModal(true)

                },
                {
                    text: "Download Curriculum",
                    link: "#curriculum",
                    color: "transparent",
                    border: "1px solid gray"
                }]
            }} />
            <WhyLearnUIUX title="Why Learn Digital Marketing Now?" data={DigitalMarketingreasons} />
            <OurServices data={Digitalmarketingcurriculum} onEnrollClick={() => setShowEnrollModal(true)} />
            <Differences
                heading="Eligible roles:"
                heading2="Industries:"
                challenges={Digitalroles}
                solutions={DigitalworkIn}
                bgcolor="black"
                bgcolor2="#F5F7F9"
                textColor="white"
                textColor2="black"
                iconcolor="#F1813B"
                iconcolor2="gray" />
            <SalaryInfo data={Digitalcards} />
            <Choices title="Why Choose QuantumCrafters?" data={Digitalcourseboxes} onEnrollClick={() => setShowEnrollModal(true)} />
            <ProgramStructure data={DigitalMarketProgram} />
            <Questions questions={DigitalMarketFaq} />
            <FormComponent heading="Ready to Become a Growth Marketer?" desc="Let’s help you build a high-impact, data-driven digital marketing career—with the tools, projects, and mentorship that matter." />
            <NewsletterSignup />
            <Footer />

            {/* Modal Render */}
            {showEnrollModal && <EnrollNowcomp onClose={() => setShowEnrollModal(false)} />}
        </>
    )
}

export default DigitalMarketingContainer