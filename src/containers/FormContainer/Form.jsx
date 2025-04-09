import React from 'react';

const Form = ({heading,desc}) => {
  return (
    <div className=' lg:w-[85%]  h-[600px] m-auto relative bg-[#F5F7F9] p-2 mt-8 rounded-xl '>
      <div className=' w-[97%] lg:w-[80%] bg-[#F1813B] absolute rounded-xl h-[580px] z-10 '>
        <h1 className='text-white sm:text-5xl  text-4xl text-center lg:text-start font-medium mt-10 lg:w-[50%] xl:w-[40%] lg:mt-20 lg:ms-8'>{heading}</h1>
        <p className='text-white text-xl sm:text-2xl font-normal px-4 lg:px-0 mt-4 ms-4 lg:ms-8 lg:w-[43%] sm:w-[70%] md:w-[60%] sm:mx-auto'>{desc}</p>
      </div>
      <div className=' w-[85%] lg:w-[50%] sm:w-[80%]  bg-[#0A0A0A] absolute h-auto outline outline-white rounded-xl p-6 top-60  sm:right-15 lg:top-14 z-20 right-5 md:right-20 lg:right-3 shadow-md'>
        <form className='space-y-4'>
          <div>
            <label htmlFor='name' className='sr-only'>Your Name</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Name'
              className='w-full p-3 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
          </div>
          <div className='gap-2'>
            <label htmlFor='email' className='sr-only'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              className='lg:w-[49%] w-full p-3  placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
             <label htmlFor='phone' className='sr-only'>Phone</label>
            <input
              id='phone'
              name='phone'
              type='tel'
              placeholder='Phone'
              className='lg:w-[48%] p-3 w-full mt-3 lg:mt-0 lg:ms-2 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
          </div>
          <div>
            <label htmlFor='subject' className='sr-only'>subject</label>
            <input
              id='subject'
              name='subject'
              type='text'
              placeholder='Enter Subject'
              className='w-full p-3 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
          </div>
          <div>
            <label htmlFor='Budget' className='sr-only'>Budget</label>
            <input
              id='Budget'
              name='Budget'
              type='text'
              placeholder='Your Budget (USD)'
              className='w-full p-3 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
          </div>
          <div>
            <label htmlFor='message' className='sr-only'>Your Message</label>
            <textarea
              id='message'
              name='message'
              rows='3'
              placeholder='Your Message'
              className='w-full p-3 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl  '
              required
            ></textarea>
          </div>
          <button className='w-full bg-[#F1813B] text-white py-3 rounded-lg hover:bg-[#d14229] transition'>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;