import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import Approach from '@/components/SeoComponent/Approach'
import Choices from '@/components/CoursesComponent/Choices'
import RankGrow from '@/components/SeoComponent/RankGrow'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import { PPCboxes, Seoboxes } from '@/components/CoursesComponent/ChoicesboxData'
import { ppcApproach, SeoApproach } from '@/components/SeoComponent/ApproachData'
import { PPCSolution } from '../ServiceContainer/WorkProcess/WorkProcessData'

const PpcContainer = () => {
  return (
    <>
     <NavbarContainer data=
                {{
                    heading: "Maximize Your ROI with Targeted PPC Campaigns",
                    para:" Drive immediate traffic, boost conversions, and outperform competitors with our expertly managed Pay-Per-Click (PPC) advertising services.",
                    buttons: [{ text: "Reach out to Expert Now", link: "/contactus", color: "#F1813B" }],
                    image: "/images/Hero Images/Heroimage-uiuxcourse.png"
                }} />
            <WorkProcess steps={PPCSolution} />
            <Approach heading="Our Comprehensive SEO Approach"
                card={ppcApproach} />
            <Choices title="Why Choose QuantumCrafters Studio Private Limited?" data={PPCboxes} />
            {/* <RankGrow /> */}
            <Footer />
    </>
  )
}

export default PpcContainer