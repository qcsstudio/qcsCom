"use client"
import React, { useEffect, useState } from 'react';
import { Loader } from '../LoaderComponent/Loader';
import FileDropzone from '../FileDropzoneComponent/FileDropzone';


const Popup = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0  bg-black/40 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className=''>
        <div className="bg-[#F5F7F9] scrollbar rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex bg-[#F1813B] text-white p-8 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{job.heading}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4 p-8">
          <div className="flex justify-between gap-4 flex-wrap">
            <p className="flex items-center gap-1">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {job.location}
            </p>
            <p className="flex items-center gap-1">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {job.workHours}
            </p>
            <p className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {job.experience}+ years experience
            </p>
          </div>
          
          <div className="prose" dangerouslySetInnerHTML={{ __html: job.description }} />
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Required Skills:</h3>
            <ul className="list-disc list-inside grid grid-cols-2 gap-2 pl-4">
              {job.skills.split(',').map((skill, index) => (
                <li key={index} className="whitespace-nowrap">{skill.trim()}</li>
              ))}
            </ul>
          </div>
          <form action="">
            <h3 className='text-2xl font-semibold py-8'>Personal Information</h3>
            <div className='flex justify-between my-2'>
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Name' type="text" />
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Email Address' type="text" />
              
            </div>
            <div className='flex justify-between my-8'>
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Contact number' type="text" />
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Current Location' type="text" />
              
            </div>
            <h3 className='text-2xl font-semibold py-8'>Personal Information</h3>
            <div className='flex justify-between my-2'>
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='LinkedIn Profile URL (Optional)' type="text" />
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Portfolio/GitHub URL (Optional)' type="text" />
              
            </div>
            <div className='flex justify-between my-8'>
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Years of Experience *' type="text" />
              <input style={{boxShadow: "-1px 6px 9px -9px rgba(66, 68, 90, 1)"}} className='rounded-[4px] pl-4 bg-white outline-0 w-[280px] h-[50px]' placeholder='Expected Salary (Optional)' type="text" />
              
            </div>
            <div>
              <FileDropzone />
            </div>
            <div className='flex gap-[20px]'>
              <input className='h-[42px] w-[42px] border-0 rounded-[4px] pl-4 bg-white outline-0' type="checkbox"  />
              <p className='text-[14px]'>I certify that all information provided is true and complete to the best of my knowledge. I understand that false information may disqualify me from consideration. *</p>
            </div>
          </form>
          <div className="pt-4">
            <button
              className="w-full bg-[#F1813B] text-white py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Submit Application
            </button>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  );
};

const CareerJobsComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const truncateDescription = (htmlString, maxLength) => {
    const strippedString = htmlString.replace(/<[^>]+>/g, '');
    if (strippedString.length > maxLength) {
      return strippedString.substring(0, maxLength) + '...';
    }
    return strippedString;
  };

  const formatDate = (dateInput) => {
    try {
      const dateString = dateInput?.$date || dateInput;
      const date = new Date(dateString);
      if (isNaN(date)) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase().replace(',', '');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

    useEffect(() => {
    if (showPopup) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showPopup]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/career');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  if (isLoading) {
    return (
      <div className='h-[40vh] w-screen flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-center items-center pt-[100px]'>
        <h1 className='text-[40px] font-[700]'>Find Your Place</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-8 p-8'>
        {jobs.map((job, index) => (
          <div key={index} className='h-[420px] w-[392px] rounded-[12px] border-[1px] border-black/30'>
            <div>
              <h1 className='text-[21px] font-[500] bg-[#F1813B] h-[66px] rounded-tl-[12px] rounded-tr-[12px] flex justify-center items-center text-white'>
                {job.heading}
              </h1>
            </div>
            <div className='pl-[20px] flex flex-col gap-[20px]'>
              <div className='flex justify-start items-center gap-[20px] pt-[15px]'>
                <div className='flex justify-center items-center gap-1'>
                  <svg className='h-[20px] w-[20px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <p className='text-[15px]'>{job.location}</p>
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <p className='text-[15px]'>{job.type}</p>
                </div>
              </div>
              <div>
                <p className='text-[15px]'>{truncateDescription(job.description, 95)}</p>
              </div>
              <div className='flex justify-start items-center gap-[5px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>{job.experience}+ years of experience</p>
              </div>
              <div>
                <h3 className='text-[15px] font-[500]'>Required Skills</h3>
              </div>
              <div>
                <ul className='flex gap-8 flex-wrap'>
                  {job.skills.split(',').map((skill, skillIndex) => (
                    <li key={skillIndex} className="whitespace-nowrap">
                      {skill.trim()}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button 
                  onClick={() => handleApplyNow(job)}
                  className='bg-[#F1813B] text-white cursor-pointer font-[700] h-[42px] w-[352px] rounded-[6px] hover:bg-orange-600 transition-colors'
                >
                  {job.buttonText || 'Apply Now'}
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <p>Posted on {formatDate(job.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <Popup 
          job={selectedJob} 
          onClose={() => {
            setShowPopup(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

export default CareerJobsComponent;