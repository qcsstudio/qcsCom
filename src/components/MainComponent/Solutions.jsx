'use client';
import { useState } from "react";
import Link from "next/link";
import { Syne, Unbounded } from "next/font/google";
import Heading from "../HeadingComponent/Heading";
import { motion, AnimatePresence } from "framer-motion";


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

      <div className=" hidden  lg:block">

        <Heading heading="What We Offer ?" />



      <div className="hidden lg:block">
        <Heading heading="What We Offer ?" />


        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className={`flex flex-wrap justify-center border-gray-200 w-[90%] mx-auto ${unbounded.className}`}
        >
          {tabData.map((tab, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, rotate: -3 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{once:true}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(index)}
                className={`p-4 text-lg md:text-[20px] lg:text-[23px] font-medium transition-all duration-200 h-auto min-h-[70px] md:min-h-[85px] lg:min-h-[99px] 
          w-[280px] sm:w-[320px] md:w-[350px] lg:w-[382px] box-border hover:cursor-pointer
          ${activeTab === index
                    ? "bg-[#F1813B] text-white rounded-t-3xl"
                    : "text-black/60"}`}
                   
              >
                {tab.label}
              </motion.button>

              {index < tabData.length - 1 && (
                <div className="hidden sm:block h-[60px] border-r-2 border-gray-500 mx-2 md:mx-4" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#F5F7F9] rounded-b-xl p-8 flex flex-col md:flex-row gap-8 items-start w-[90%] mx-auto"
          >
            {/* Left: Text */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.1 }}
              className="flex-1"
            >
              <TabPanel content={tabData[activeTab].content} />
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ x: 30, opacity: 0, rotate: 2 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.1 }}
              className="w-full md:w-70 h-70"
            >
              <img
                src={tabData[activeTab].content.image}
                alt="Tab illustration"
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>


      {/* responsive design */}

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 mt-5 lg:hidden w-[90%] mx-auto">
  {tabData.map((tab, i) => (
    <div
      key={i}
      className="w-full md:w-[50%] lg:w-[32%] bg-white rounded-[20px] shadow-md flex flex-col"
    >
      {/* Orange Header */}
      <div className="bg-[#F1813B] text-white text-center py-3 px-4 text-[18px] font-semibold rounded-t-[20px]">
        {tab.label}
      </div>

      {/* Card Body */}
      <div className="flex flex-col justify-between flex-grow px-5 py-6 h-full">
        <div>
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

          {/* Sub Description */}
          {tab.content.subDescription && (
            <p className={`text-[14px] mb-4 text-gray-600 ${syne.className}`}>
              {tab.content.subDescription}
            </p>
          )}
        </div>

        {/* Button Always At Bottom */}
        {tab.content.buttons && tab.content.buttons.length > 0 && (
          <div className="mt-4">
            <Link href={tab.content.buttons[0].link}>
              <button className="bg-[#F1813B] text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-[#da6c27] transition w-full">
                {tab.content.buttons[0].text}
              </button>
            </Link>
          </div>
        )}

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 mt-5 lg:hidden w-[95%] mx-auto">
        {tabData.map((tab, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotate: -4, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{
              delay: i * 0.2,
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[50%] rounded-[20px] overflow-hidden shadow-md bg-white"
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
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {item.strong && <strong>{item.strong}</strong>}
                      {item.text || item}
                    </motion.li>
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
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#F1813B] text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-[#da6c27] transition"
                  >
                    {tab.content.buttons[0].text}
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        ))}

      </div>


    </>
  );
}
