import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import FormComponent from '@/components/MainComponent/FormComponent'
import Questions from '../ServiceContainer/Questions/Questions'
import { faqsData2 } from '../ServiceContainer/Questions/faqsData'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import { roles, workIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import { curriculum } from '@/components/EduservicePageComponent/OurserviceData'
import Choices from '@/components/CoursesComponent/Choices'
import ToolsPlatforms from '@/components/EduservicePageComponent/ToolsPlatforms'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'

const EduserviceContainer = () => {
  return (
   <>
     <NavbarContainer data={{heading:"Design Intuitive Interfaces. Shape Digital Experiences.",
        para:"Learn how to design stunning, user-first websites and apps with industry-standard tools and project-based learning. Get mentored, build real portfolios, and kickstart your career in design.",
        buttons:[{text:"Enroll Now",link:"#",color:"#F1813B",border:"none"},{text:"Download Curriculum",link:"#",color:"transparent",border:"1px solid gray"}]}}/>
      <WhyLearnUIUX/>
      <OurServices data={curriculum}/>

    <Differences title="Career Outcomes" heading="Roles You Can Work As!" heading2="You Can Work In!"
    challenges={roles} solutions={workIn} bgcolor="black" bgcolor2="#F5F7F9" textColor="white" 
    textColor2="black" iconcolor="#F1813B" iconcolor2="gray"/>
    <SalaryInfo/>
    <Choices title="Why Choose QuantumCrafters?"/>
    <ToolsPlatforms/>
    <ProgramStructure/>
    <Questions questions={faqsData2}/>
    <FormComponent heading="Ready to Design the Future?" desc="Join the fastest-growing creative tech career today. Learn UI/UX the right way—with real projects, expert mentorship, and limitless growth."/>
    <NewsletterSignup/> 
    <Footer/>
   </>
  )
}

export default EduserviceContainer