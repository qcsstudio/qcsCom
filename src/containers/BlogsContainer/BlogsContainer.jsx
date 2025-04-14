'use client'
import React from 'react'
import NavbarContainer from '../ServiceContainer/NavbarContainer/NavbarContainer'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import ReqresPagination from './ReqresPagination'


const BlogsContainer = () => {
    return (
        <>
            {/* <NavbarContainer data={{
                heading: "Empowering Dreams,Building Futures",
                para: "At QuantumCrafter Studio, we help you turn passion into a career. Through hands-on learning and expert guidance, we prepare you for real-world success in tech and design.",
                buttons: [{ text: "Explore Courses Now", link: "#", color: "#F1813B" },]
            }} />
            <Footer/> */}
            <ReqresPagination/>
          
        </>
    )
}

export default BlogsContainer