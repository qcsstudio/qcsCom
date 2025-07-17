"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';





const projectEstimation = [
    {
        title: "Share Your Requirement with us",
        desc: "Learn to approach problems like a designer - using empathy-driven, design thinking methods to create user-first solutions.",
        image: "/images/Images/projectimage.png"
    },
    {
        title: "Sign NDA",
        desc: "We sign NDA with all of our customers and make you feel secure. By doing so we would like to assure you of the privacy of your idea and project.",
        image: "/images/Images/projectimage2.png"
    },
    {
        title: "Analyzing Your Requirement",
        desc: "Once you share your requirements, our scrum masters will analyze them and get back to you within a few hours.",
        image: "/images/Images/projectimage3.png"
    },
    {
        title: "Get Your Estimation",
        desc: "Once our team finalizes the project scope and resources, we'll share the estimated cost and delivery timeline with you.",
        image: "/images/Images/projectimage4.png"
    },
];

export default function ProposalForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        Location: "",
        contactNumber: "",
        service: "",
        description: "",
        file: null,
        updates: false
    });

    const [captchaToken, setCaptchaToken] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    const token = await executeRecaptcha("form_submit");
    console.log("Captcha Token:", token);

    const res = await fetch('/api/verify-captcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (data.success) {
      alert("CAPTCHA verified! Form submitted successfully.");
      // Proceed to submit form data to your backend or email service
    } else {
      alert("CAPTCHA failed. Try again.");
    }
  } catch (error) {
    console.error("Form error:", error);
    alert("Something went wrong. Try again later.");
  }
};

    return (
        <div className="flex items-center justify-center w-[90%] mx-auto my-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full ">
                {/* Left Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className={`text-[35px] font-medium font-unbounded`}>Trusted by Top Brands Across The Globe</h2>
                    <p className={`text-xl font-normal text-[#030204] font-montserrat`}>
                        Our Simplest Yet Robust Process To Get Your Project Estimation.
                    </p>
                    <div className="space-y-4">
                        {projectEstimation.map((item, idx) => (
                            <div key={idx} className="bg-[#F5F7F9] p-4 -xl rounded-lg">
                                <div className="flex justify-between items-start">
                                    <h4 className={`font-medium text-[21px] font-unbounded`}>{item.title}</h4>
                                    <Image src={item.image} width={39} height={39} alt="image" />
                                </div>
                                <p className={`text-[15px] text-[#030204] mt-2 font-montserrat`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="lg:col-span-2 bg-white px-6 space-y-6 border-2 border-gray-300 rounded-xl">
                    <h3 className={`text-[40px] font-bold text-center mt-10 font-unbounded`}>Tell us about your <span className="text-[#F1813B]">Project</span></h3>
                    <form className={`space-y-7 font-montserrat`} onSubmit={handleSubmit}>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-black font-montserrat`}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full placeholder-black placeholder:text-base border-gray-300 border-b-2 rounded p-2 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full placeholder-black border-gray-300 border-b-2 rounded p-2 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center border-gray-300 border-b-2 gap-1 p-2">
                                <Image src="/images/Images/flag.png" width={22} height={16} alt="image" />
                                <span className="mr-2">+91</span>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="Contact number"
                                    className="w-full placeholder-black focus:outline-none rounded"
                                />
                            </div>
                            <input
                                type="text"
                                name="Location"
                                value={formData.Location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="w-full placeholder-black border-gray-300 border-b-2 rounded p-2 focus:outline-none"
                            />

                        </div>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full placeholder-black border-gray-300 rounded border-b-2 p-2 focus:outline-none"
                        >
                            <option value="" disabled hidden>Looking for *</option>
                            <option value="AI-Poewred IT Services">AI-Poewred IT Services</option>
                            <option value="AI-Based SAAS Products">AI-Based SAAS Products</option>
                            <option value="Institutional training">Institutional training</option>
                        </select>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            rows="5"
                            className="w-full placeholder-black rounded-xl bg-[#F2F2F2] p-2 focus:outline-none"
                        ></textarea>

                        <div className="flex items-center gap-2">
                            <label className="flex items-center cursor-pointer">
                                <Image src="/images/Images/upload.png" alt="upload" width={78} height={48} />
                                <span className="text-gray-500 px-4 py-2 text-base">Attach file (less than 10MB)</span>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* <ReCAPTCHA
                            className="z-10"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={handleCaptchaChange}
                        /> */}

                        <div className="mx-auto justify-center flex">
                            <button
                                type="submit"
                                className="bg-[#F1813B] font-bold text-base text-white py-2 px-9 rounded-lg"
                            >
                                Submit
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Your idea is 100% protected by our non-disclosure agreement.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                            <input
                                type="checkbox"
                                id="updates"
                                name="updates"
                                checked={formData.updates}
                                onChange={handleChange}
                            />
                            <label htmlFor="updates">Keep me updated of the upcoming technology trends</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
