import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function PhoneInputWithTailwind() {
  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <div className="">
      <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700">
        
      </label>
      <PhoneInput
        id="phone-input"
        international
        defaultCountry="IN"
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Enter phone number"
        style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}}
        className="rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]"
      />
    </div>
  );
}

export default PhoneInputWithTailwind;