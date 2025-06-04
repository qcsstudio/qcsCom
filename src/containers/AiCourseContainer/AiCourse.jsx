'use client'
import React, { useState } from 'react'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import { Aireasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import Choices from '@/components/CoursesComponent/Choices'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import Questions from '../ServiceContainer/Questions/Questions'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import { Aicurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import { Airoles, AiworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import { Aicourseboxes } from '@/components/CoursesComponent/ChoicesboxData'
import { AiFaq } from '../ServiceContainer/Questions/faqsData'
import EnrollNowcomp from '@/components/CoursesComponent/EnrollNowcomp'

const Aicards = [
    {
        title: "Avg. Entry Salary",
        value: "₹5-8 LPA ",
    },
    {
        title: "Experienced Roles",
        value: " ₹12-18 LPA",
    },
    {
        title: "Global Freelancing",
        value: " $25-$80/hr ",
    },
];

const AiProgram = [
    {
        title: "Duration",
        points: ["6 to 8 Months (Self-Paced + Mentorship)"],
        image: "/images/Images/Uiprogram1.png"
    },
    {
        title: "Mode",
        points: [" Online + Optional In-Person Projects"],
        image: "/images/Images/Uiprogram2.png"
    },
    {
        title: "Certification",
        points: ["AI Capstone + GitHub Review Badge"],
        image: "/images/Images/Uiprogram3.png"
    },
    {
        title: "Eligibility",
        points: [" UG/PG, Engineers, Data Enthusiasts, Non-Coders Welcome"],
        image: "/images/Images/Uiprogram4.png"
    },
];

const AiCourse = () => {
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    return (
        <>
            <NavbarContainer data={{
                heading: "Master AI, Build Smart Systems, Shape the Future.",
                para: "Get industry-ready in AI and ML with our hands-on training program. Learn Python, ML algorithms, model deployment, and data analytics. Start from zero and grow into a real-world AI engineer.",
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
            <WhyLearnUIUX title=" Why Learn AI & Machine Learning?" data={Aireasons} />
            <OurServices data={Aicurriculum} onEnrollClick={() => setShowEnrollModal(true)} />
            <Differences title="Career Outcomes" heading="Eligible roles:" heading2="Industries:"
                challenges={Airoles} solutions={AiworkIn} bgcolor="black" bgcolor2="#F5F7F9" textColor="white"
                textColor2="black" iconcolor="#F1813B" iconcolor2="gray" />
            <SalaryInfo data={Aicards} />
            <Choices title="Why Choose QuantumCrafters?" data={Aicourseboxes}  onEnrollClick={() => setShowEnrollModal(true)} />
            <ProgramStructure data={AiProgram} />
            <Questions questions={AiFaq} />
            <FormComponent heading="Ready to Get Future-Ready with AI?" desc="Build the skills of tomorrow. Join our AI & Machine Learning program and become part of the smart-tech revolution." />
            <NewsletterSignup />
            <Footer />

            {/* Modal Render */}
            {showEnrollModal && <EnrollNowcomp onClose={() => setShowEnrollModal(false)} />}
        </>
    )
}

export default AiCourse