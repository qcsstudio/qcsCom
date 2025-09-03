"use client";
import React, { useState } from "react";

const Page = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    } else {
      alert("Please fill both fields!");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* PDF Background */}
      <iframe
        src="/resources/QCSSTUDIO_Deck.pdf"
        width="100%"
        height="100%"
        style={{
          border: "none",
          filter: formSubmitted ? "none" : "blur(15px)",
          pointerEvents: formSubmitted ? "auto" : "none", 
        }}
      />

      {/* Popup Form */}
      {!formSubmitted && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Access PDF
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Submit & View PDF
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
