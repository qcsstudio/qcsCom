'use client';
import { useState } from "react";
import Link from "next/link";
import { Syne, Unbounded } from "next/font/google";


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
      image: "/images/Images/ourservicesimage1.png"
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
      image: "/images/Images/ourservicesimage2.png"
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
      image: "/images/Images/ourservicesimage3.png"
    },
  },
];

// Component to render content
function TabPanel({ content }) {
  return (
    <>

      <div>

        {content.heading && <h2 className={`text-4xl font-bold mb-4 ${unbounded.className}`}>{content.heading}</h2>}
        {content.description && <p className={`mb-4 text-[21px] ${syne.className}`}>{content.description}</p>}

        {content.list && (
          <ul className={`pl-5 space-y-2 mb-4 list-disc text-[21px] ${syne.className}`}>
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
          <div className={`flex gap-4 ${syne.className}`}>
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

const syne = Syne({ subsets: ['latin'], weight: '400' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '600' })

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className=" mt-15 hidden  lg:block">
        <div className="   rounded-xl px-20 py-3">
          <h3 className={`text-[2.8rem] font-bold text-center mb-5 ${unbounded.className}`}>What We Offer ?</h3>

        </div>00

        {/* Tabs */}

        <div className={`flex flex-wrap justify-center border-gray-200 w-[90%] mx-auto ${unbounded.className}`}>
          {tabData.map((tab, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveTab(index)}
                className={`p-4 text-lg md:text-[20px] lg:text-[23px] font-medium transition-all duration-200 h-auto min-h-[70px] md:min-h-[85px] lg:min-h-[99px] 
        w-[280px] sm:w-[320px] md:w-[350px] lg:w-[382px] box-border 
        ${activeTab === index
                    ? "bg-[#F1813B] text-white rounded-t-3xl"
                    : "text-black/60"}`}
              >
                {tab.label}
              </button>

              {index < tabData.length - 1 && (
                <div className="hidden sm:block h-[60px] border-r-2 border-gray-500 mx-2 md:mx-4" />
              )}
            </div>
          ))}
        </div>



        <div className="bg-[#F5F7F9] rounded-b-xl p-8 flex flex-col md:flex-row gap-8 items-start w-[90%] mx-auto">
          {/* Left: Text */}
          <div className="flex-1">
            <TabPanel content={tabData[activeTab].content} />
          </div>

          {/* Right: Placeholder Image */}
          <div className="w-full md:w-70 h-70">
            <img
              src={tabData[activeTab].content.image}
              alt="Tab illustration"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

      </div>

      {/* responsive design */}
      <div className="flex flex-wrap justify-center gap-6  lg:hidden w-[95%] mx-auto">
  {tabData.map((tab, i) => (
    <div
      key={i}
      className="max-w-[380px] w-full rounded-[20px] overflow-hidden shadow-md bg-white"
    >
      {/* Orange Header */}
      <div className="bg-[#F1813B] text-white text-center py-3 px-4 text-[18px] font-semibold rounded-t-[20px]">
        {tab.label}
      </div>

      {/* Card Body */}
      <div className="px-5 py-6 text-black">
        {/* Heading */}
        {tab.content.heading && (
          <h3 className={`text-[18px] font-bold mb-3 ${unbounded.className}`}>
            {tab.content.heading}
          </h3>
        )}

        {/* Description */}
        {tab.content.description && (
          <p className={`text-[14px] mb-4 text-gray-700 ${syne.className}`}>
            {tab.content.description}
          </p>
        )}

        {/* Bullet List */}
        {tab.content.list && (
          <ul className={`list-disc pl-5 mb-5 space-y-2 text-[14px] text-gray-800 ${syne.className}`}>
            {tab.content.list.map((item, index) => (
              <li key={index}>
                {item.strong && <strong>{item.strong}</strong>}
                {item.text || item}
              </li>
            ))}
          </ul>
        )}

        {/* Sub Description (for 3rd card) */}
        {tab.content.subDescription && (
          <p className={`text-[14px] mb-4 text-gray-600 ${syne.className}`}>
            {tab.content.subDescription}
          </p>
        )}

        {/* Button */}
        {tab.content.buttons && tab.content.buttons.length > 0 && (
          <Link href={tab.content.buttons[0].link}>
            <button className="bg-[#F1813B] text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-[#da6c27] transition">
              {tab.content.buttons[0].text}
            </button>
          </Link>
        )}
      </div>
    </div>
  ))}
</div>

    </>
  );
}
