import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import Link from "next/link";

function ContactSection() {
  return (
    <div id="contactus" className="bg-gray-100 py-10 px-5 text-center mt-40 lg:mt-10 m-auto">
      <h2 className="text-3xl font-bold text-gray-900">Ready to Innovate?</h2>
      <p className="text-gray-600 mt-2">
        Unlock exponential growth with QuantumCrafters' powerful AI solutions.
      </p>

      <div className="mt-6 w-[85%] mx-auto flex flex-col md:flex-row justify-center gap-4">
        {/* Card 1 - Email */}
        <a
          href="mailto:info@qcsstudio.com"
          className="flex items-center gap-3 bg-white p-4 rounded-lg w-full md:w-1/3 cursor-pointer hover:shadow-lg transition"
        >
          <div>
            <FaEnvelope className="text-[#F1813B] text-2xl" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Mail us at</h3>
            <p className="text-gray-600 text-sm">info@qcsstudio.com</p>
          </div>
        </a>

        {/* Card 2 - WhatsApp */}
        <a
          href="tel:+918264017346"
          className="flex items-center gap-3 bg-white p-4 rounded-lg w-full md:w-1/3 cursor-pointer hover:shadow-lg transition"
        >
          <div>
            <FaWhatsapp className="text-[#F1813B] text-2xl" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">WhatsApp Now</h3>
            <p className="text-gray-600 text-sm">+91-8264017346</p>
          </div>
        </a>

        {/* Card 3 - AI Strategy */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg w-full md:w-1/3 cursor-pointer hover:shadow-lg transition">
          <div>
            <BsExclamationCircle className="text-[#F1813B] text-2xl" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">
              Book Your AI Strategy Session Today
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
