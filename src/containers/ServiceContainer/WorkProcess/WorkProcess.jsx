'use client';
import IconNtext from "@/components/iconNtextComponent/IconNtext";
import { Syne } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const syne = Syne({ subsets: ['latin'], weight: '500' });

const WorkProcess = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const stepRefs = useRef([]);


  
  // Detect screen size once
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);
  // Mobile Intersection Observer
  useEffect(() => {
    if (!isMobile || !stepRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepNum = parseInt(entry.target.dataset.step);
          if (entry.isIntersecting) {
            setActiveStep(stepNum);
            setVisibleSteps((prev) => new Set(prev).add(stepNum));
          }
        });
      },
      { threshold: 0.6 }
    );
    stepRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      stepRefs.current.forEach(ref => ref && observer.unobserve(ref));
    };
  }, [isMobile]);

  // Width handling for non-mobile steps
  const getDesktopStepWidth = () => {
    switch (steps.length) {
      case 4: return "md:w-[55%] lg:w-[64%] xl:w-[72%]";
      case 5: return "md:w-[40%] lg:w-[53%] xl:w-[60%]";
      case 6: return "md:w-[20%] lg:w-[41%] xl:w-[53%]";
      default: return "md:w-[40%]";
    }
  };

  return (
    <>
      <IconNtext text="Our Work Process" link="/images/Icons/WorkProcess.png" />
      <p className={`w-[90%] text-lg mx-auto px-2 ${syne.className}`}>
        At QuantumCrafters Studio, as a leading digital marketing company in Mohali,
        we follow a clear, step-by-step process to ensure every campaign delivers
        maximum impact and measurable ROI.
      </p>

      <div className="flex flex-col md:flex-row gap-5 my-10 w-full md:w-[95%] lg:w-[90%] mx-auto">
        <div className={`flex flex-col md:flex-row w-full gap-3
          ${isMobile ? "snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth" : "overflow-visible"}
          md:h-auto`}
        >
          {steps.map((step, index) => {
            const isActive = activeStep === step.number;
            const isVisible = visibleSteps.has(step.number);

            const baseClasses = "group snap-start overflow-x-hidden flex-shrink-0 transition-all duration-700 ease-in-out rounded-xl ";
            const activeMobileClasses = "w-full h-auto p-6 bg-black text-white";
            const inactiveMobileClasses = "w-full min-h-screen  bg-gray-100 text-black  hover:bg-gray-200 ";
            const activeDesktopClasses = `h-auto md:h-[389px] p-6 bg-black text-white overflow-y-hidden ${getDesktopStepWidth()}`;
            const inactiveDesktopClasses = "md:w-[100px] h-auto md:h-auto p-4 bg-gray-100  hover:bg-gray-200 ";

            const finalStepClass = `${baseClasses} ${isMobile 
              ? (isActive ? activeMobileClasses : inactiveMobileClasses) 
              : (isActive ? activeDesktopClasses : inactiveDesktopClasses)
            } ${isMobile && isVisible ? "animate-fadeInUp" : ""}`;

            return (
              <div
                key={step.number}
                data-step={step.number}
                ref={(el) => (stepRefs.current[index] = el)}
                className={finalStepClass}
                onClick={() => !isMobile && setActiveStep(step.number)}
              >
                <h1 className={`text-2xl md:text-3xl font-bold flex items-start md:items-center transition-all  
                  ${isActive ? "text-white " : "text-[#F1813B] relative -right-10 group-hover:right-2 duration-500"}`}>
                  <span className="mr-2 text-4xl md:text-9xl">{step.number}</span>
                  {isActive && (
                    <span className="ml-2 text-2xl md:text-4xl">{step.title}</span>
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
