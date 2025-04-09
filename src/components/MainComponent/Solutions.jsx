'use client';
import { useState } from "react";

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
      buttons: [{ text: "Explore AI Services →", type: "primary" }],
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
      buttons: [{ text: "Try ElevatrX Free", type: "primary" }],
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
      buttons: [{ text: "Explore Courses", type: "primary" }],
    },
  },
];

// Ek component jo tab ke content dikhata hai
function TabPanel({ content }) {
  return (
    <div>
      {content.heading && <h2 className="text-xl font-bold mb-4">{content.heading}</h2>}
      {content.description && <p className="mb-4">{content.description}</p>}

      {/* Agar list hai toh usko render karo */}
      {content.list && (
        <ul className="pl-5 space-y-2 mb-4 ">
          {content.list.map((item, i) => (
            <li key={i}>
              {item.text && <strong>{item.strong}</strong>}
              {item.text || item}
            </li>
          ))}
        </ul>
      )}

      {content.subDescription && <p className="mb-4">{content.subDescription}</p>}

      {/* Buttons */}
      {content.buttons && (
        <div className="flex gap-4">
          {content.buttons.map((btn, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded ${
                btn.type === "outline"
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

// Main component
export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0); // Kon sa tab active hai

  return (
    <div className="p-6 max-w-[80%] mx-auto">
  {/* Tabs */}
  <div className="flex space-x-4">
    {tabData.map((tab, index) => (
      
      <button
        key={index}
        onClick={() => setActiveTab(index)}
        className={`p-4 px-4 text-base font-medium ${
          index !== tabData.length - 1 ? "border-r-2 border-black" : ""
        } ${
          activeTab === index
            ? "bg-[#F1813B] rounded-t-xl text-white border-none"
            : "text-[#000000] hover:text-[#F1813B]  border-black"
        }`}
      >
        {tab.label}
      </button>
    ))}
    
  </div>



      {/* Tab content box */}
      <div className="bg-[#F5F7F9] rounded-xl  p-6 ">
        <div className="bg-gray-200 h-64 w-64 float-right rounded-xl"></div>
        <TabPanel content={tabData[activeTab].content} />

      </div>
    </div>
  );
}
