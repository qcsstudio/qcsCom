'use client';
import React, { useState, useEffect, useRef } from 'react';
import Heading from '../HeadingComponent/Heading';
import { motion } from 'framer-motion';


const testimonials = [
  {
    id: 2,
    name: 'QuantamCrafters Studio',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/IN15BAYqY8I?enablejsapi=1',
  },
  {
    id: 1,
    name: 'ElevatrX',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/3491mfemOIo?enablejsapi=1',
  },
];

export default function LeaderComponent() {
  const playerRefs = useRef({});
  const containerRefs = useRef({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    } else {
      initYouTubePlayers();
    }

    window.onYouTubeIframeAPIReady = () => {
      initYouTubePlayers();
    };
  }, []);

  const initYouTubePlayers = () => {
    testimonials.forEach(({ id }) => {
      const iframe = document.getElementById(`yt-player-${id}`);
      if (iframe && !playerRefs.current[id]) {
        playerRefs.current[id] = new window.YT.Player(iframe);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInside = Object.values(containerRefs.current).some((ref) =>
        ref?.contains(event.target)
      );

      if (!clickedInside && activeVideo !== null) {
        const player = playerRefs.current[activeVideo];
        if (player?.pauseVideo) {
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
    if (player?.playVideo) {
      if (activeVideo !== null && activeVideo !== id) {
        const prevPlayer = playerRefs.current[activeVideo];
        prevPlayer?.pauseVideo();
      }

      player.playVideo();
      setActiveVideo(id);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    hover: { scale: 1.05, rotate: [0, 1, -1, 0], transition: { duration: 0.3 } },
  };

  return (
    <section className="w-[90%] mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Heading heading="Meet Elevatrx The Social Media Automation" />

      <div className=" mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {testimonials.map(({ id, name, title, videoUrl }, index) => (
            <motion.div
              key={id}
              ref={(el) => (containerRefs.current[id] = el)}
              onClick={() => handlePlay(id)}
              className="bg-[#e8eaec]  rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-yellow-300/30 transition-all"
              initial={{
                opacity: 0,
                scale: 0.3,
                rotate: Math.random() * 60 - 30, // random rotation
                y: index % 2 === 0 ? -200 : 200, // alternate fly-in direction
                x: index % 2 === 0 ? -200 : 200,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                x: 0,
                y: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: index * 0.2,
              }}
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                boxShadow: '0 0 10px rgba(255, 255, 0, 0.3)',
                transition: { duration: 0.3 },
              }}
              viewport={{ once: true }}
            >
              {isClient ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    id={`yt-player-${id}`}
                    src={videoUrl}
                    title={name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-300 rounded-xl animate-pulse"></div>
              )}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className={`text-lg sm:text-xl font-semibold font-unbounded`}>{name}</h3>
                <p className={`text-sm text-gray-600 font-montserrat`}>{title}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
