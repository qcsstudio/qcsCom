"use client"
import React, { useEffect, useState } from 'react';

const CareerJobsComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncateDescription = (htmlString, maxLength) => {
    const strippedString = htmlString.replace(/<[^>]+>/g, '');
    if (strippedString.length > maxLength) {
      return strippedString.substring(0, maxLength) + '...';
    }
    return strippedString;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/carrer/');
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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
                {job.title}
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
                <button className='bg-[#F1813B] text-white font-[700] h-[42px] w-[352px] rounded-[6px]'>
                  {job.buttonText || 'Apply Now'}
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <p>Posted on {job.postDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerJobsComponent;