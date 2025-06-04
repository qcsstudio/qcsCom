import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WhyLearnUIUX from '@/components/EduservicePageComponent/WhylearnUI'
import { DataAnalyticsreasons } from '@/components/EduservicePageComponent/WhylearnUIUXData'
import OurServices from '@/components/EduservicePageComponent/OurServices'
import { DataAnalyticscurriculum } from '@/components/EduservicePageComponent/OurserviceData'
import Differences from '../ServiceContainer/OurDifferences/Differences'
import { DataAnalyticsroles, DataAnalyticsworkIn } from '../ServiceContainer/OurDifferences/DifferencesData'
import { DataAnalyticscourseboxes } from '@/components/CoursesComponent/ChoicesboxData'
import Choices from '@/components/CoursesComponent/Choices'
import ProgramStructure from '@/components/EduservicePageComponent/ProgramStructure'
import Questions from '../ServiceContainer/Questions/Questions'
import { DataAnalyticsFaq } from '../ServiceContainer/Questions/faqsData'
import FormComponent from '@/components/MainComponent/FormComponent'
import NewsletterSignup from '@/components/MainComponent/NewsletterSignup'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import SalaryInfo from '@/components/EduservicePageComponent/SalaryInfo'

const DataAnalyticsProgram = [
  {
    title: "Duration",
    points: [" 4.5 to 6 Months (Part-Time Friendly)"],
    image: "/images/Images/Uiprogram1.png"
  },
  {
    title: "Mode",
    points: ["Online + Optional Labs"],
    image: "/images/Images/Uiprogram2.png"
  },
  {
    title: "Certification",
    points: [" Analytics Pro Credential + Capstone Evaluation"],
    image: "/images/Images/Uiprogram3.png"
  },
  {
    title: "Eligibility",
    points: [" Students, Professionals, Analysts, Career Switchers"],
    image: "/images/Images/Uiprogram4.png"
  },

];

const DataAnalyticscards = [
  {
    title: "Avg. Entry Salary",
    value: "₹4-8 LPA",
  },
  {
    title: "Experienced Roles",
    value: " ₹8-12 LPA",
  },
  {
    title: "Global Freelancing",
    value: " $30-$75/hr ",
  },
];


const DataAnalyticsCourse = () => {
  return (
    <>
      <NavbarContainer data={{
        heading: "Turn Raw Data into Powerful Insights with AI.",
        para: "Become a data-driven decision-maker. Learn how to clean, visualize, and analyze data using Excel, SQL, Power BI, and Python—then level up with AI models and forecasting techniques.",
        buttons: [{ text: "Enroll Now", link: "#", color: "#F1813B", border: "none" }, { text: "Download Curriculum", link: "#", color: "transparent", border: "1px solid gray" }]
      }} />
      <WhyLearnUIUX title="Why Learn Data Analytics with AI?" data={DataAnalyticsreasons} />
      <OurServices data={DataAnalyticscurriculum} />
      <Differences title="Career Outcomes" heading="Eligible roles:" heading2="Industries:"
        challenges={DataAnalyticsroles} solutions={DataAnalyticsworkIn} bgcolor="black" bgcolor2="#F5F7F9" textColor="white"
        textColor2="black" iconcolor="#F1813B" iconcolor2="gray" />
      <SalaryInfo data={DataAnalyticscards} />
      {/* <Choices title="Why Choose QuantumCrafters?" data={DataAnalyticscourseboxes} /> */}
      <ProgramStructure data={DataAnalyticsProgram} />
      <Questions questions={DataAnalyticsFaq} />
      <FormComponent heading="Ready to Analyze Smarter?" desc="Unlock a future-proof career in data. Learn how to read the numbers—and let AI do the rest." />
      <NewsletterSignup />
      <Footer />
    </>
  )
}

export default DataAnalyticsCourse