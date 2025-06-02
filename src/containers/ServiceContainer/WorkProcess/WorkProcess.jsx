import { useEffect, useRef, useState } from "react";

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
        <div className="w-[95%] mx-auto mt-10">
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

            {/* Steps container */}
            <div className="flex flex-col md:flex-row justify-center gap-4 my-10 w-full md:w-[85%] mx-auto">
                {/* Mobile: scrollable full height view */}
                <div className="flex flex-col md:flex-row w-full snap-y snap-mandatory overflow-y-auto md:overflow-visible max-h-screen md:max-h-fit">
                    {steps.map((step, index) => {
                        const isActive = activeStep === step.number;
                        const isVisible = visibleSteps.includes(step.number);
                        return (
                            <div
                                key={step.number}
                                data-step={step.number}
                                ref={(el) => (stepRefs.current[index] = el)}
                                className={`snap-start flex-shrink-0 transition-all duration-700 ease-in-out
                                    ${
                                        isActive
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-black hover:bg-gray-200"
                                    }
                                    ${
                                        isVisible && window.innerWidth < 768 ? "animate-fadeInUp" : ""
                                    }
                                    ${
                                        window.innerWidth < 768
                                            ? "w-full min-h-screen p-6"
                                            : isActive
                                            ? "w-full md:w-[80%] h-auto md:h-[389px] p-6"
                                            : "w-full md:w-[100px] h-auto md:h-[389px] p-4"
                                    }
                                    rounded-xl shadow-lg`}
                                onClick={() => {
                                    if (window.innerWidth >= 768) {
                                        setActiveStep(step.number);
                                    }
                                }}
                            >
                                <h1
                                    className={`text-2xl md:text-3xl font-bold flex items-start md:items-center transition-all ${
                                        isActive ? "text-white" : "text-[#F1813B]"
                                    }`}
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
        </div>
    );
};

export default WorkProcess;
