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
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Intersection Observer for mobile only
  useEffect(() => {
    if (!isMobile) return;

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
  }, [isMobile]);

  return (
    <>
      <IconNtext text="Our Work Process" link="/images/Icons/WorkProcess.png" />
      <p className={`w-[90%] text-lg mx-auto px-2 ${syne.className}`}>
        At QuantumCrafters Studio, as a leading digital marketing company in Mohali,
        we follow a clear, step-by-step process to ensure every campaign delivers
        maximum impact and measurable ROI.
      </p>

      <div className="flex flex-col md:flex-row gap-5 my-10 w-full md:w-[90%] mx-auto ">
        <div className={`flex flex-col md:flex-row w-full gap-3
                        ${isMobile ? "snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth" : "overflow-visible"}
                        md:h-auto`}>

          {steps.map((step, index) => {
            const isActive = activeStep === step.number;
            const isVisible = visibleSteps.has(step.number);

            return (
              <div
                key={step.number}
                data-step={step.number}
                ref={(el) => (stepRefs.current[index] = el)}
                className={` group
                  snap-start   overflow-x-hidden flex-shrink-0 transition-all duration-700 ease-in-out  rounded-xl shadow-lg 
                  ${isActive ? "bg-black text-white overflow-y-hidden  " : "bg-gray-100 text-black hover:bg-gray-200  "}
                  ${isVisible && isMobile ? "animate-fadeInUp" : ""}
                  ${
                    isMobile
                      ? `w-full ${isActive ? "h-auto" : "min-h-screen"} p-6`
                      : isActive
                      ? ` h-auto md:h-[389px] p-6 ${steps.length == 4? " md:w-[60%] lg:w-[64%] xl:w-[72%]" : "md:w-[50%]"}
                       ${steps.length == 5? "md:w-[25%] lg:w-[53%] xl:w-[60%]" : "md:w-[25%]"}
                       ${steps.length == 6? "md:w-[20%] lg:w-[41%] xl:w-[53%]" : "md:w-[20%]"}`
                      : "md:w-[100px] h-auto md:h-auto p-4  "
                  }
                `}
                onClick={() => {
                  if (!isMobile) setActiveStep(step.number);
                }}
              >
                <h1 className={`text-2xl md:text-3xl font-bold flex items-start md:items-center transition-all  
                  ${isActive ? "text-white" : "text-[#F1813B] relative -right-10 overflo-x-hidden group-hover:right-2 transition-all duration-500 ease-in-out"}`}>
                  <span className="mr-2 text-4xl md:text-9xl ">{step.number}</span>
                  {isActive && <span className="ml-2 text-2xl md:text-4xl">{step.title}</span>}
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
