import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import WorkProcess from '../ServiceContainer/WorkProcess/WorkProcess'
import { SeoSolution, steps } from '../ServiceContainer/WorkProcess/WorkProcessData'
import Approach from '@/components/SeoComponent/Approach'
import { SeoApproach } from '@/components/SeoComponent/ApproachData'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Choices from '@/components/CoursesComponent/Choices'
import {  Seoboxes } from '@/components/CoursesComponent/ChoicesboxData'
import RankGrow from '@/components/SeoComponent/RankGrow'

const SeoContainer = () => {
    return (
        <>
            <NavbarContainer data=
                {{
                    heading: "Drive Organic Growth with Expert SEO Services",
                    para: `At QuantumCrafters Studio, we understand that climbing search engine rankings is 
                        both art and science. Our end-to-end SEO solutions are designed to increase your
                        visibility, attract qualified leads, and amplify your brand's authority online. Whether you're a startup 
                        looking to make a splash or an established enterprise aiming to dominate your niche, our proven strategies
                        deliver measurable results—without the fluff.`,
                    buttons: [{ text: "Reach out to Expert Now", link: "/contactus", color: "#F1813B" }],
                    image: "/images/Hero Images/Heroimage-uiuxcourse.png"
                }} />
            <WorkProcess steps={SeoSolution} />
            <Approach heading="Our Comprehensive SEO Approach"
                card={SeoApproach} />
            <Choices title="Why Choose QuantumCrafters?" data={Seoboxes}  onEnrollClick="/contactus"  />
            <RankGrow />
            <Footer />

        </>
    )
}
// onEnrollClick={() => setShowEnrollModal(true)} 
export default SeoContainer