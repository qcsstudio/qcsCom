// components/MainComponent/RegistrationModal.jsx
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { RxCross2 } from "react-icons/rx"
import { Syne, Unbounded } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: '400' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '700' })

const EnrollNowcomp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", contactNumber: "", dob: "",
    program: "", preferredStartDate: "", hearAboutUs: "", message: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted data:", formData)
    setFormData({ name: "", email: "", contactNumber: "", dob: "", program: "", preferredStartDate: "", hearAboutUs: "", message: "" })
    onClose()
  }

  return (
    <div className={`fixed inset-0 bg-black/60 flex justify-center items-center z-50 ${syne.className}`}>
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-2xl relative">
        <button className="absolute top-2 right-3 text-black text-xl" onClick={onClose}>
          <RxCross2 />
        </button>
        <h2 className={`text-2xl font-bold text-center mb-6 ${unbounded.className}`}>Registration Form</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="border p-2 rounded" />
          <div className="flex items-center border gap-1 p-2 rounded">
            <Image src="/images/Images/flag.png" width={22} height={16} alt="flag" />
            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+91 Contact number" className="focus:outline-none" />
          </div>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded" />
          <select name="program" value={formData.program} onChange={handleChange} className="border p-2 rounded col-span-2">
            <option value="" disabled>Choose Your Program</option>
            <option>Web Development</option>
            <option>Digital Marketing</option>
            <option>Data Science & AI</option>
            <option>UI/UX Designing</option>
            <option>Networking</option>
          </select>
          <input type="date" name="preferredStartDate" value={formData.preferredStartDate} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <input type="text" name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} className="border p-2 rounded col-span-2" placeholder="How did you hear about us" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Any Message or Query" className="border p-2 rounded col-span-2 h-35" />
          <button type="submit" className="bg-[#F1813B] text-white py-2 rounded col-span-2 hover:bg-orange-600">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EnrollNowcomp;
