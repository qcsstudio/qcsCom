'use client'
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import { Syne } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const syne = Syne({subsets:['latin'],weight:'500'})
const WorkProcess = ({ steps }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const stepRefs = useRef([]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const stepNum = parseInt(entry.target.dataset.step);
                        setActiveStep(stepNum);
                        if (!visibleSteps.includes(stepNum)) {
                            setVisibleSteps((prev) => [...prev, stepNum]);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.6,
            }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            stepRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [visibleSteps]);

    return (
        <>
        <IconNtext text="Our Work Process" link="/images/Icons/WorkProcess.png"/>
        <p className={`w-[90%] text-lg mx-auto ${syne.className}`}>
            At QuantumCrafters Studio, as a leading digital marketing company in Mohali, we follow a clear,
             step-by-step process to ensure every campaign delivers maximum impact and measurable ROI.
             </p>
        <div className="flex flex-col md:flex-row gap-4 my-10 w-full md:w-[90%] mx-auto">
            <div className="flex flex-col md:flex-row w-full
                            snap-y snap-mandatory
                            overflow-y-auto md:overflow-visible
                            h-screen md:h-auto
                            scroll-smooth">
                {steps.map((step, index) => {
                    const isActive = activeStep === step.number;
                    const isVisible = visibleSteps.includes(step.number);
                    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

                    return (
                        <div
                            key={step.number}
                            data-step={step.number}
                            ref={(el) => (stepRefs.current[index] = el)}
                            className={`snap-start flex-shrink-0 transition-all duration-700 ease-in-out 
                                ${isActive ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
                                ${isVisible && isMobile ? "animate-fadeInUp" : ""}
                                ${
                                    isMobile
                                        ? `w-full ${isActive ? "h-auto" : "min-h-screen"} p-6`
                                        : isActive
                                            ? "w-full md:w-[65%] h-auto md:h-[389px] p-6"
                                            : "w-full md:w-[100px] h-auto md:h-auto p-4"
                                }
                                rounded-xl shadow-lg`}
                            onClick={() => {
                                if (!isMobile) {
                                    setActiveStep(step.number);
                                }
                            }}
                        >
                            <h1
                                className={`text-2xl md:text-3xl font-bold flex items-start md:items-center transition-all 
                                    ${isActive ? "text-white" : "text-[#F1813B]"}`}
                            >
                                <span className="mr-2 text-4xl md:text-6xl">{step.number}</span>
                                {isActive && (
                                    <span className="ml-2 text-2xl md:text-4xl">
                                        {step.title}
                                    </span>
                                )}
                            </h1>
                            {isActive && (
                                <p className="mt-3 text-gray-300 text-base md:text-xl leading-relaxed">
                                    {step.content}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
};

export default WorkProcess;
