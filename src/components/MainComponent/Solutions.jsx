'use client';
import { useState } from "react";

const tabData = [
    {
        label: "AI-Powered IT Services",
        content: {
            heading: "Smart AI Solutions Tailored for Your Business.",
            description: "We offer customized AI consulting, process automation, machine learning integrations, and predictive analytics, enabling startups and SMEs to:",
            list: [
                { strong: "Increase Productivity", text: " Automate routine tasks." },
                { strong: "Improve Efficiency", text: " Integrate intelligent AI systems." },
                { strong: "Accelerate Growth", text: " Leverage data-driven insights." },
            ],
            buttons: [
                { text: "Explore AI Services →", type: "primary" },
            ]
        },
    },
    {
        label: "AI-Based SaaS Products",
        content: {
            heading: "Tools Designed to Simplify & Amplify.",
            description: "Our SaaS platforms are built to help teams manage and automate critical tasks effortlessly:",
            list: [
                { strong: "ElevatrX", text: " AI-powered social media management: plan, schedule, and analyze content effortlessly." },
                { strong: "QCS HRMS (Launching Soon)", text: " Automate hiring, onboarding, and HR analytics to empower your workforce management." },
            ],
            buttons: [
                { text: "Try ElevatrX Free", type: "primary" },

            ]
        },
    },
    {
        label: "Institutional Training",
        content: {
            heading: "Turning Potential into Performance.",
            description: "Our training programs empower students with practical skills, real projects, and career guidance, covering:",
            list: [
                { text: "Full-Stack Web Development" },
                { text: "UI/UX Design" },
                { text: "Digital Marketing" },
                { text: "Cybersecurity & Cloud Computing" },
                { text: "Artificial Intelligence & Machine Learning" },
                { text: "Data Science & Analytics" },
            ],
            subDescription: "Learn by building real projects, guided by expert mentors, and boost your employability from day one.",
            buttons: [
                { text: "Explore Courses", type: "primary" },

            ]
        },
    },
];

// Reusable Tab Content Renderer
function TabPanel({ content }) {
    return (
        <div>
            {content.heading && <h2 className="text-2xl font-bold mb-4">{content.heading}</h2>}
            {content.description && <p className="mb-4">{content.description}</p>}

            {content.list && (
                <ul className=" pl-5 space-y-2 mb-4">
                    {content.list.map((item, index) => (
                        <li key={index}>
                            {item.strong && <strong>{item.strong}</strong>}
                            {item.text || item}
                        </li>
                    ))}
                </ul>
            )}

            {content.subDescription && <p className="mb-4">{content.subDescription}</p>}

            {content.buttons && (
                <div className="flex gap-4">
                    {content.buttons.map((btn, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded ${btn.type === "outline"
                                    ? "border border-[#F1813B] text-[#F1813B]"
                                    : "bg-[#F1813B] text-white"
                                }`}
                        >
                            {btn.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Solutions() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex border-b border-gray-200 mb-6 space-x-4">
                {tabData.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(index)}
                        className={`pb-2 px-4 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === index
                                ? "border-[#F1813B] text-[#F1813B]"
                                : "border-transparent text-gray-600 hover:text-[#F1813B]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <TabPanel content={tabData[activeTab].content} />
            </div>
        </div>
    );
}
