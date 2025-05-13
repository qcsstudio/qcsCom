'use client'
import React, { useState } from "react";
import {Syne,Unbounded} from 'next/font/google';


const syne = Syne({subsets:['Latin'],Weight:'400'})
const unbounded = Unbounded({subsets:['Latin'],Weight:'400'})
export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  return (
    <div className="bg-[#F5F7F9] rounded-xl p-8 my-40 lg:my-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 w-full max-w-6xl mx-auto">
      <div className="max-w-md">
        <h2 className={`text-5xl font-semibold text-black mb-1 ${unbounded.className}`}>Stay Updated</h2>
        <p className={`text-base font-medium text-gray-600 mt-2 ${syne.className}`}>
          Sign up for the newsletter to stay up-to-date on all latest events and news from QuantumCrafter Studio
        </p>
      </div>

      <form className='w-full md:max-w-2xl'  onSubmit={handleSubmit}>
        <div className={`flex flex-col gap-3 w-full ${syne.className}`}>
          <div className="flex gap-3 w-full">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex w-full">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F1813B] text-white px-6 py-2 rounded-r-full text-sm font-medium hover:bg-orange-600"
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
