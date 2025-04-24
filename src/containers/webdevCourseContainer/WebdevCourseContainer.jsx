import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import { webdevreasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import { webDevcurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import { Webdevroles, WebdevworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import Choices from '@/components/CoursesComponent/Choices'
import { webdevcourseboxes } from '@/components/CoursesComponent/ChoicesboxData'
import { EduserviceFaq, WebDevelopmentFaq } from '../ServiceContainer/Questions/faqsData'
import Questions from '../ServiceContainer/Questions/Questions'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'



const WebDevcards = [
  {
    title: "Avg. Entry Salary",
    value: "₹4.5-6.5 LPA",
  },
  {
    title: "Experienced Roles",
    value: " ₹10-18 LPA",
  },
  {
    title: "Global Freelancing",
    value: " $20-$50/hour",
  },
];

const webdevProgram = [
  {
    title: "Duration",
    points: ["6 to 8 Months (Flexible Learning Pace)"],
    image: "/images/Images/Uiprogram1.png"
  },
  {
    title: "Mode",
    points: ["Hybrid (Online + Optional Campus Support)"],
    image: "/images/Images/Uiprogram2.png"
  },
  {
    title: "Certification",
    points: [" Industry Recognized + GitHub Verified"],
    image: "/images/Images/Uiprogram3.png"
  },
  {
    title: "Eligibility",
    points: [" Any Graduate, Final Year Student, Career Switcher"],
    image: "/images/Images/Uiprogram4.png"
  },

];


const WebdevCourseContainer = () => {
  return (
    <>
      <NavbarContainer data={{
        heading: "Become a Job-Ready Full Stack Developer. Build Real Projects. Get Hired.",
        para: "Learn front-end and back-end development with India’s most practical, mentorship-driven full stack course. No boring theory. Just real skills, real projects, and real career growth.",
        buttons: [{ text: "Enroll Now", link: "#", color: "#F1813B", border: "none" }, { text: "Download Curriculum", link: "#", color: "transparent", border: "1px solid gray" }]
      }} />
      <WhyLearnUIUX title=" Why Learn Full Stack Development?" data={webdevreasons} />
      <OurServices data={webDevcurriculum} />
      <Differences title="Career Outcomes" heading="Become eligible for roles like:" heading2="You Can Work In!"
        challenges={Webdevroles} solutions={WebdevworkIn} bgcolor="black" bgcolor2="#F5F7F9" textColor="white"
        textColor2="black" iconcolor="#F1813B" iconcolor2="gray" />
      <SalaryInfo data={WebDevcards} />
      <Choices title="Why Choose QuantumCrafters?" data={webdevcourseboxes} />
      <ProgramStructure data={webdevProgram} />
      <Questions questions={WebDevelopmentFaq} />
      <FormComponent heading=" Ready to Code Your Future?" desc="Unlock your potential as a Full Stack Developer. Learn by doing, get mentorship that matters, and launch your tech career with confidence." />
      <NewsletterSignup />
      <Footer />
    </>
  )
}

export default WebdevCourseContainer