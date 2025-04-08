import React from "react";

export default function NewsletterSignup() {
  return (
    <div className="bg-[#F5F7F9] rounded-xl p-8  my-40 lg:my-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8  w-full max-w-6xl mx-auto">
      <div className="max-w-md">
        <h2 className="text-5xl font-semibold text-black mb-1">Stay Updated</h2>
        <p className="text-base font-medium text-gray-600 mt-2">
          Sign up for the newsletter to stay up-to-date on all latest events and news from QuantumCrafter Studio
        </p>
      </div>

      <form className="w-full md:max-w-2xl">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-3 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex gap-3 w-full">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow px-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-[#F1813B] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}