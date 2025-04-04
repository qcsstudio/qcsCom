'use client';
import React, { useState } from "react";

const steps = [
    {
        number: 1,
        title: "Discover & Strategize",
        content:
            "We dive deep into understanding your brand, goals, and audience. Through collaborative discussions and research, we craft a clear roadmap tailored to your needs.",
    },
    {
        number: 2,
        title: "Build & Launch",
        content:
            "Our creative team gets to work, blending innovation with strategy to design visuals, content, and assets that resonate with your brand. Every detail is refined to perfection.",
    },
    {
        number: 3,
        title: "Optimize & Scale",
        content:
            "We continuously analyze performance metrics and user feedback to optimize strategies, ensuring your brand’s growth in a competitive digital landscape.",
    },
    {
        number: 4,
        title: "Refine & Grow",
        content:
            "We don't stop at the launch. We analyze performance, gather feedback, and fine-tune to ensure your brand keeps evolving and thriving in the digital landscape.",
    },
];

const WorkProcess = () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="w-full  mt-10">
            {/* Header */}
            <div className="w-fit mx-auto mb-6">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-e-lg">
                    <img
                        src="/images/Images/servicesLogo.png"
                        alt="Services Logo"
                        className="w-6 h-6"
                    />
                    <span className="font-semibold text-sm text-gray-700">
                        Our Work Process
                    </span>
                </div>
            </div>

            {/* Steps Section */}
            <div className="flex justify-center gap-1 my-10 w-[85%] mx-auto">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className={`cursor-pointer transition-all duration-500 
                            ${
                                activeStep === step.number
                                    ? "w-[80%] h-[389px] bg-black text-white p-6 rounded-xl shadow-lg"
                                    : "w-[100px] h-[389px] bg-gray-100 text-black p-4 hover:bg-gray-200 rounded-lg"
                            }`}
                        onClick={() => setActiveStep(step.number)}
                    >
                        <h1
                            className={`text-3xl font-bold flex items-center transition-all ${
                                activeStep === step.number ? "text-white" : "text-[#F1813B]"
                            }`}
                        >
                            <span className="mr-2 text-6xl">{step.number}</span>
                            {activeStep === step.number && (
                                <span className="ml-2 text-4xl">{step.title}</span>
                            )}
                        </h1>
                        {activeStep === step.number && (
                            <p className="mt-3 text-gray-300 text-xl leading-relaxed">
                                {step.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkProcess;
