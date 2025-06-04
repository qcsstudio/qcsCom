import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import FormComponent from '@/components/MainComponent/FormComponent'
import Questions from '../ServiceContainer/Questions/Questions'
import { EduserviceFaq } from '../ServiceContainer/Questions/faqsData'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import {  UiUxroles, UiUxworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import {  UiUxcurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import Choices from '@/components/CoursesComponent/Choices'
import ToolsPlatforms from '@/components/EduservicePageComponent/ToolsPlatforms'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import {  UiUxreasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import { uiboxes } from '@/components/CoursesComponent/ChoicesboxData'


const UiUxcards = [
  {
    title: "Avg. Entry Salary",
    value: "₹3.5-6 LPA",
  },
  {
    title: "Experienced Roles",
    value: "₹8-15 LPA",
  },
  {
    title: "Global Freelancing",
    value: "$25-$80/hr",
  },
];

const cards = [
  {
    title: "Duration",
    points: ["5 to 7 Months", "Flexible", "Self-Paced + Mentorship"],
     image:"/images/Images/Uiprogram1.png"
  },
  {
    title: "Mode",
    points: ["Offline", "In-House Mentoring"],
     image:"/images/Images/Uiprogram2.png"
  },
  {
    title: "Certification",
    points: ["Design Proficiency Certificate", "Portfolio Review Badge"],
     image:"/images/Images/Uiprogram3.png"
  },
  {
    title: "Eligibility",
    points: ["Beginners", "College Students", "Working Professionals"],
     image:"/images/Images/Uiprogram4.png"
  }
    
];

const EduserviceContainer = () => {
  return (
   <>
     <NavbarContainer data={{heading:"Design Intuitive Interfaces. Shape Digital Experiences.",
        para:"Learn how to design stunning, user-first websites and apps with industry-standard tools and project-based learning. Get mentored, build real portfolios, and kickstart your career in design.",
        buttons:[{text:"Enroll Now",link:"#",color:"#F1813B",border:"none"},{text:"Download Curriculum",link:"#",color:"transparent",border:"1px solid gray"}],
        image:"/images/Hero Images/Heroimage-uiuxcourse.png"
        }}/>
      <WhyLearnUIUX title="Why Learn UI/UX Design?" data={UiUxreasons}/>
      <OurServices data={UiUxcurriculum}/>

    <Differences title="Career Outcomes" heading="Roles You Can Work As!" heading2="You Can Work In!"
    challenges={UiUxroles} solutions={UiUxworkIn} bgcolor="black" bgcolor2="#F5F7F9" textColor="white" 
    textColor2="black" iconcolor="#F1813B" iconcolor2="gray"/>
    <SalaryInfo data={UiUxcards}/>
    {/* <Choices title="Why Choose QuantumCrafters?" data={uiboxes}/> */}
    <ToolsPlatforms/>
    <ProgramStructure data={cards}/>
    <Questions questions={EduserviceFaq}/>
    <FormComponent heading="Ready to Design the Future?" desc="Join the fastest-growing creative tech career today. Learn UI/UX the right way—with real projects, expert mentorship, and limitless growth."/>
    <NewsletterSignup/> 
    <Footer/>
   </>
  )
}

export default EduserviceContainer