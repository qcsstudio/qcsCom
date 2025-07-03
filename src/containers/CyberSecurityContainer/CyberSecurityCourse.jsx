'use client'
import React, { useState } from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import Choices from '@/components/CoursesComponent/Choices'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import Questions from '../ServiceContainer/Questions/Questions'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import { Cyberreasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import { Cybercurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import { Cyberroles, CyberworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import { Aicourseboxes } from '@/components/CoursesComponent/ChoicesboxData'
import { CyberFaq } from '../ServiceContainer/Questions/faqsData'
import EnrollNowcomp from '@/components/CoursesComponent/EnrollNowcomp'


const Cybercards = [
    {
        title: "Avg. Entry Salary",
        value: "₹4-6.5 LPA ",
    },
    {
        title: "Experienced Roles",
        value: " ₹8-15+ LPA ",
    },
    {
        title: "Global Freelancing",
        value: " $30-$100/hr  ",
    },
];

const CyberProgram = [
    {
        title: "Duration",
        points: [" 5 to 6 Months (Flexible Pacing)"],
        image: "/images/Images/Uiprogram1.png"
    },
    {
        title: "Mode",
        points: ["Online + Optional On-Campus Workshops"],
        image: "/images/Images/Uiprogram2.png"
    },
    {
        title: "Certification",
        points: ["Security Fundamentals + Project Completion Badge"],
        image: "/images/Images/Uiprogram3.png"
    },
    {
        title: "Eligibility",
        points: ["  IT/CS Students, Graduates, Engineers, Tech Enthusiasts"],
        image: "/images/Images/Uiprogram4.png"
    },
];

const CyberSecurityCourse = () => {
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    return (
        <>
            <NavbarContainer data={{
                heading: "Secure the Future. Learn Cyber Defense & Cloud Tech.",
                para: "Build in-demand skills to protect digital infrastructure and master the basics of cloud computing. From ethical hacking to AWS/Azure, get hands-on experience and mentorship.",
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
            <WhyLearnUIUX title=" Why Learn Cybersecurity & Cloud?" data={Cyberreasons} />
            <OurServices data={Cybercurriculum} onEnrollClick={() => setShowEnrollModal(true)} />
            <Differences
                heading="Eligible roles:"
                heading2="Industries:"
                challenges={Cyberroles}
                solutions={CyberworkIn}
                bgcolor="black"
                bgcolor2="#F5F7F9"
                textColor="white"
                textColor2="black"
                iconcolor="#F1813B"
                iconcolor2="gray" />
            <SalaryInfo data={Cybercards} />
            <Choices title="Why Choose QuantumCrafters?" data={Aicourseboxes} onEnrollClick={() => setShowEnrollModal(true)} />
            <ProgramStructure data={CyberProgram} />
            <Questions questions={CyberFaq} />
            <FormComponent heading=" Secure Your Career. Join the Cybersecurity Revolution." desc="Let’s help you build the digital walls and secure your future in the booming cloud & cybersecurity ecosystem." />
            <NewsletterSignup />
            <Footer />

            {/* Modal Render */}
            {showEnrollModal && <EnrollNowcomp onClose={() => setShowEnrollModal(false)} />}
        </>
    )
}

export default CyberSecurityCourse