import React from 'react';

const Form = () => {
  return (
    <div className='w-[85%]  h-[600px] m-auto relative bg-[#F5F7F9] p-2 mt-8 rounded-xl '>
      <div className='w-[80%] bg-[#F1813B] absolute rounded-xl h-[580px] z-10 '>
        <h1 className='text-white text-5xl font-medium mt-20 ms-8'>Need a custom quote?</h1>
        <p className='text-white text-2xl font-normal  mt-4 ms-8'>Don't let your ideas sit idle—slide<br/>
        into our inbox and let's make magic!</p>
      </div>
      <div className='w-[50%] bg-[#0A0A0A] absolute h-auto outline outline-white rounded-xl p-6 top-14 z-20 right-5 shadow-md'>
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
              className='w-[49%] p-3  placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
              required
            />
             <label htmlFor='phone' className='sr-only'>Phone</label>
            <input
              id='phone'
              name='phone'
              type='tel'
              placeholder='Phone'
              className='w-[49%] p-3 ms-2 placeholder-gray-300 text-white bg-white/5 focus:outline-none rounded-3xl'
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