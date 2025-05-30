'use client';
import React, { useContext, useEffect } from 'react'
import Images from '@/containers/ServiceContainer/Iamgescontainer/Images'
import ServicesContainer from '@/containers/ServiceContainer/OurServices/ServicesContainer'
import Form from '@/containers/ServiceContainer/FormContainer/Form'
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer'
import Differences from '@/containers/ServiceContainer/OurDifferences/Differences'
import Benifits from '@/containers/ServiceContainer/BenifitsContainer/Benifits'
import WorkProcess from '@/containers/ServiceContainer/WorkProcess/WorkProcess'
import Questions from '@/containers/ServiceContainer/Questions/Questions'
import ClientStories from '@/containers/ServiceContainer/Stories/Clientstories'
import ContactSection from '@/components/serviceComponents/ContactUs/Contactus'
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer'
import BrandsContainer from '@/containers/ServiceContainer/BrandsContainer/BrandsContainer'
import LeaderComponent from '@/components/MainComponent/LearderComponent'
import Slider from '@/containers/ServiceContainer/SliderContainer/Slider'
import { benefits } from '@/containers/ServiceContainer/BenifitsContainer/BenifitsData.jsx'
import { ImagesSlide } from '@/containers/ServiceContainer/SliderContainer/SliderImages'
import { steps } from '@/containers/ServiceContainer/WorkProcess/WorkProcessData'
import { ServiceFaq } from '@/containers/ServiceContainer/Questions/faqsData'
import { challenges, solutions } from '@/containers/ServiceContainer/OurDifferences/DifferencesData'
import Overview from '@/components/serviceComponents/OverviewComponent/Overview'
import { HomeTestimonial } from '@/containers/ServiceContainer/Stories/TestimonialsData'
import { usePathname } from 'next/navigation';
import { cardcontext } from '@/context/scrollcardcontext';


const ServicePageContainer = () => {
    const pathname = usePathname();
    const currPath = pathname.split("/")[1];

    const { setScrollCardData } = useContext(cardcontext);

    useEffect(() => {
        if (currPath) {
            setScrollCardData(currPath);
        }
    }, [currPath]);
    return (
        <>
            <NavbarContainer data={{
                heading: "Unlock Growth with Next-Gen AI & Automation Solutions",
                para: "Transform your business operations through strategic automation, advanced machine learning, and personalized AI consulting.",
                buttons: [{ text: "Get Started", link: "#", color: "#F1813B", border: "none" }, { text: "Explore Services", link: "#", color: "transparent", border: "1px solid black" }],
                image: "/images/Hero Images/Heroimage-service.png"
            }} />
            <Overview />
            <ServicesContainer />
            <Images />
            <BrandsContainer />
            <Benifits BenefitsData={benefits}/>
            <Slider images={ImagesSlide} />
            {/* <WorkProcess steps={steps} /> */}
            <Differences title="Business Challenges & Innovative Solutions" heading="Common Challenges Businesses Face:"
                heading2="QuantumCrafters' Cutting-Edge Solutions:" challenges={challenges} solutions={solutions} bgcolor="#F5F7F9" bgcolor2="black" textColor="black"
                textColor2="white" iconcolor="gray" iconcolor2="#F1813B" />
            <ClientStories heading="Hear Stories Straight From the People We Helped" testimonials={HomeTestimonial} />
            <LeaderComponent />
            <Questions questions={ServiceFaq} />
            {/* <AboutUs /> */}
            <Form heading="Need a custom quote?" desc="Don't let your ideas sit idle—slide
                into our inbox and let's make magic!"/>
            <ContactSection />
            <Footer />
        </>
    )
}

export default ServicePageContainer;