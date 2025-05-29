// Button.jsx
"use client"
import React from 'react';
import Link from 'next/link';

const Button = ({ color, text, border, link }) => {
  return (
    <Link href={link}>
      <button
        style={{ backgroundColor: `${color}`, border: `${border}` }}
        className="hover:bg-[rgb(241,129,59)] px-6 py-2 text-sm sm:text-[16px]  rounded-md transition-colors duration-200"
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
