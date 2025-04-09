import React from 'react'

const Button = ({ color, text, border }) => {
  return (
    <button
      style={{ backgroundColor: `${color}`, border: `${border}` }}
      className="hover:bg-[#F1813B] px-6 py-2 text-sm sm:text-lg rounded-md transition-colors duration-200"
    >
      {text}
    </button>
  );
};

export default Button;
