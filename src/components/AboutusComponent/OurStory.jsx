import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "../HeadingComponent/Heading";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ['latin'], weight: "500" });

const OurStory = () => {
  return (
    <section className="bg-white py-10">
      <div className="w-[90%] mx-auto">
        <Heading heading="Our Story" />

        <div className={`bg-gray-50 rounded-xl p-6 lg:flex lg:gap-6 ${syne.className}`}>
          {/* Left Text Content */}
          <div className="lg:w-2/3 text-[#000000] text-xl space-y-4">
            <p>
              <Link href="/">
                <span className="font-bold hover:text-[#F1813B]">QuantumCrafters Studio </span>
              </Link>
              was founded with a purpose—to bridge the widening gap between education and employability,
              between what students learn and what businesses truly need. It all began when our founder,
              while mentoring aspiring tech professionals, noticed a recurring issue: students were
              equipped with theoretical knowledge but lacked hands-on industry skills, and startups
              lacked smart, affordable digital solutions. What started as a mentorship initiative
              quickly evolved into a full-fledged mission to empower businesses with AI-powered tools
              and prepare the next generation of tech talent through real-world training. From a single
              vision, QuantumCrafters has grown into a trusted name in IT services,
              <Link href="https://elevatrx.app/"><span className="font-bold hover:text-[#F1813B]"> SaaS product development</span></Link>, and career-focused training across India.
            </p>
          </div>

          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <Image
              src="/images/Images/Mask group.png"
              width={439}
              height={359}
              alt="Ravi k Sankhyan"
              className="w-full h-40 sm:h-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
