'use client';
import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 2,
    name: 'Thaddeus Montgomery',
    title: 'OWNER, GOLDGARDEN',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/IN15BAYqY8I?enablejsapi=1'
  },
  {
    id: 1,
    name: 'Magnus Hawthorne',
    title: 'OWNER, BAYLEAF',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/3491mfemOIo?enablejsapi=1'
  }
];

export default function LeaderComponent() {
  const playerRefs = useRef({});
  const containerRefs = useRef({});
  const [activeVideo, setActiveVideo] = useState(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }

    window.onYouTubeIframeAPIReady = () => {
      testimonials.forEach(({ id }) => {
        const iframe = document.getElementById(`yt-player-${id}`);
        if (iframe) {
          playerRefs.current[id] = new window.YT.Player(iframe);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInside = Object.values(containerRefs.current).some((ref) =>
        ref?.contains(event.target)
      );

      if (!clickedInside && activeVideo !== null) {
        const player = playerRefs.current[activeVideo];
        if (player && player.pauseVideo) {
          player.pauseVideo();
        }
        setActiveVideo(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeVideo]);

  const handlePlay = (id) => {
    const player = playerRefs.current[id];

    if (player && player.playVideo) {
      // Pause previous
      if (activeVideo !== null && activeVideo !== id) {
        const prevPlayer = playerRefs.current[activeVideo];
        if (prevPlayer && prevPlayer.pauseVideo) {
          prevPlayer.pauseVideo();
        }
      }

      player.playVideo();
      setActiveVideo(id);
    }
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-center mt-10 my-5">Trusted by Industry Leaders</h2>
     
      <div className=" p-3 w-[80%]   mx-auto rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(({ id, name, title, videoUrl }) => (
            <div
              key={id}
              className="rounded-2xl p-3 video-container cursor-pointer bg-gray-100"
              ref={(el) => (containerRefs.current[id] = el)}
              onClick={() => handlePlay(id)}
            >
              <iframe
                id={`yt-player-${id}`}
                src={videoUrl}
                width="100%"
                height="315"
                title={name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl w-full pointer-events-none"
              ></iframe>
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
