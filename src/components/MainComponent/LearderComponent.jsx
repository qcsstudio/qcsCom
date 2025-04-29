'use client'
import React, { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    id: 2,
    name: 'Thaddeus Montgomery',
    title: 'OWNER, GOLDGARDEN',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/IN15BAYqY8I?si=-3fCPpvYA3eH5jL_'
  },
  {
    id: 1,
    name: 'Magnus Hawthorne',
    title: 'OWNER, BAYLEAF',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/3491mfemOIo?si=9dgAprAXHQ_3K_Sm'
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
      <h2 className="text-3xl font-bold text-center mb-10">Trusted by Industry Leaders</h2>
      <div className="bg-gray-100 p-3 w-[80%] mx-auto rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(({ id, name, title, videoType, videoUrl }) => (
            <div key={id} className="rounded-2xl video-container">
              {videoType === 'local' ? (
                <video
                  ref={(el) => (videoRefs.current[id] = el)}
                  src={videoUrl}
                  muted
                  controls
                  autoPlay={activeVideo === id}
                  className="rounded-2xl w-full"
                  onClick={() => handlePlay(id)}
                />
              ) : (
                <iframe
                  width="100%"
                  height="315"
                  src={videoUrl}
                  title={name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-2xl w-full"
                ></iframe>
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
