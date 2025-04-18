import { FaEnvelope, FaWhatsapp,  } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";


 function ContactSection() {
  return (
    <div id="contactus" className="bg-gray-100 py-10 px-5 text-center mt-40 lg:mt-10 m-auto">
      <h2 className="text-3xl font-bold text-gray-900">Ready to Innovate?</h2>
      <p className="text-gray-600 mt-2">Unlock exponential growth with QuantumCrafters' powerful AI solutions.</p>

      <div className="mt-6 w-[85%] mx-auto flex flex-col md:flex-row justify-center gap-4">
        <ContactCard
          icon={<FaEnvelope className="text-[#F1813B] text-2xl" />}
          title="Mail us at"
          detail="info@qcsstudio.com"
        />
        <ContactCard
          icon={<FaWhatsapp className="text-[#F1813B] text-2xl" />}
          title="WhatsApp Now"
          detail="+91-8264017346"
        />
        <ContactCard
          icon={<BsExclamationCircle  className="text-[#F1813B] text-2xl" />}
          title="Book Your AI Strategy Session Today"
        />
      </div>
    </div>
  );
}
export default ContactSection;

const ContactCard = ({ icon, title, detail }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg  w-full md:w-1/3 cursor-pointer hover:shadow-lg transition">
      <div>{icon}</div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {detail && <p className="text-gray-600 text-sm">{detail}</p>}
      </div>
    </div>
  );
}
