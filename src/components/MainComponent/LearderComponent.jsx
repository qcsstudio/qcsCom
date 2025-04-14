'use client'
import React, { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Magnus Hawthorne',
    title: 'OWNER, BAYLEAF',
    videoUrl: '/video/Morniye.mp4',
    thumbnail: '/images/Images/videoImage1.png'
  },
  {
    id: 2,
    name: 'Thaddeus Montgomery',
    title: 'OWNER, GOLDGARDEN',
    videoUrl: '/video/Morniye.mp4',
    thumbnail: '/images/Images/videoImage2.png'
  }
];

export default function LeaderComponent() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});

  const handlePlay = (id) => {
    if (activeVideo !== id) {
      if (videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo].pause();
        videoRefs.current[activeVideo].currentTime = 0;
      }
      setActiveVideo(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeVideo !== null &&
        !event.target.closest('video') &&
        !event.target.closest('.video-container')
      ) {
        if (videoRefs.current[activeVideo]) {
          videoRefs.current[activeVideo].pause();
          videoRefs.current[activeVideo].currentTime = 0;
        }
        setActiveVideo(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeVideo]);

  return (
    <>
      <h2 className="text-3xl font-bold text-center  mb-10">Trusted by Industry Leaders</h2>
    <div className="bg-gray-100 p-3 w-[80%] mx-auto rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map(({ id, name, title, videoUrl, thumbnail }) => (
          <div key={id} className=" rounded-2xl   video-container">
            {activeVideo === id ? (
              <video
                ref={(el) => (videoRefs.current[id] = el)}
                src={videoUrl}
                muted
                controls
                autoPlay
                className="rounded-2xl"
              />
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={() => handlePlay(id)}
              >
                <img src={thumbnail} alt={name} className="rounded-2xl w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
