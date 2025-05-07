'use client';
import { useState } from "react";
import Link from "next/link";

// Tab ke data yahan define hain
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
      buttons: [{ text: "Explore AI Services →", link: "/services" }],
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
      buttons: [{ text: "Try ElevatrX Free", link: "" }],
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
      buttons: [{ text: "Explore Courses", link: "/courses" }],
    },
  },
];

// Component to render content
function TabPanel({ content }) {
  return (
    <>

      <div>

        {content.heading && <h2 className="text-4xl font-bold mb-4">{content.heading}</h2>}
        {content.description && <p className="mb-4 text-[21px]">{content.description}</p>}

        {content.list && (
          <ul className="pl-5 space-y-2 mb-4 list-disc text-[21px]">
            {content.list.map((item, i) => (
              <li key={i}>
                {item.strong && <strong>{item.strong}</strong>}
                {item.text || item}
              </li>
            ))}
          </ul>
        )}

        {content.subDescription && <p className="mb-4">{content.subDescription}</p>}


        {content.buttons && (
          <div className="flex gap-4">
            {content.buttons.map((btn, i) => (
              <Link key={i} href={btn.link}>
                <button
                  className={`px-4 py-2 rounded ${btn.type === "outline"
                    ? "border border-[#F1813B] text-[#F1813B]"
                    : "bg-[#F1813B] text-white"
                    }`}
                >
                  {btn.text}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// Main Component
export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className=" mt-10 ">
        <div className=" bg-[#F5F7F9] mb-10 rounded-xl px-20 py-10">
          <h3 className='text-3xl font-bold text-[#F1813B]  mb-5'>What We Offer ?</h3>
          <p className=' text-xl font-normal mt-3'>We provide AI-powered IT services, innovative SaaS
            platforms, and hands-on training programs to drive business success and empower future-ready careers.
          </p>
        </div>

        {/* Tabs */}
        
        <div className="flex border-gray-200 mt-5 w-[90%] mx-auto">
          {tabData.map((tab, index) => (
            <div key={index} className="flex items-center  ">
              <button
                onClick={() => setActiveTab(index)}
                className={`p-4 px-4 text-[25px] font-medium transition-all duration-200 h-[99px] w-[398px] ${activeTab === index
                  ? "bg-[#F1813B] text-white rounded-t-3xl"
                  : "text-gray-700 hover:text-[#F1813B]"
                  }`}
              >
                {tab.label}
              </button>

              {index < tabData.length - 1 && (
                <div className="h-14 border-r-2 border-gray-500 mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#F5F7F9] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start w-[90%] mx-auto">
          {/* Left: Text */}
          <div className="flex-1">
            <TabPanel content={tabData[activeTab].content} />
          </div>

          {/* Right: Placeholder Image */}
          <div className="w-full md:w-70 h-70 bg-gray-300 rounded-xl" />
        </div>

      </div>
    </>
  );
}
