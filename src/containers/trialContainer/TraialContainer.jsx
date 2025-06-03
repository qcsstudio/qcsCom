"use client"
import { useState, useEffect } from 'react';
import { ImageTrail } from "./Image-trial";
const DemoOne = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [key, setKey] = useState(0);
  const imageItems = [
    'https://picsum.photos/id/287/300/300',
    'https://picsum.photos/id/1001/300/300',
    'https://picsum.photos/id/1025/300/300',
    'https://picsum.photos/id/1026/300/300',
    'https://picsum.photos/id/1027/300/300',
    'https://picsum.photos/id/1028/300/300',
    'https://picsum.photos/id/1029/300/300',
    'https://picsum.photos/id/1030/300/300',
    'https://picsum.photos/id/10/300/300',
    'https://picsum.photos/id/20/300/300',
    'https://picsum.photos/id/30/300/300',
    'https://picsum.photos/id/40/300/300',
  ];
  const [currentVariant, setCurrentVariant] = useState(1);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const darkMode = mediaQuery.matches;
      setIsDarkMode(darkMode);
      document.documentElement.classList.toggle('dark', darkMode);
    };
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const handleVariantChange = (event) => {
    const newVariant = parseInt(event.target.value, 10);
    setCurrentVariant(newVariant);
    setKey(prevKey => prevKey + 1);
  };
  const pageBgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const selectBgColor = isDarkMode ? "bg-neutral-800" : "bg-neutral-200";
  const selectBorderColor = isDarkMode ? "border-neutral-600" : "border-neutral-400";
  return (
    <div className={`flex flex-col w-full min-h-screen justify-center items-center
                   p-4 space-y-6
                   ${pageBgColor} ${textColor}
                   transition-colors duration-300`}>
      <div className="absolute top-4 right-4 z-[200] flex items-center gap-2">
        <label htmlFor="variant-select" className={`text-sm font-medium ${textColor}`}>
          Variant:
        </label>
        <select
          id="variant-select"
          value={currentVariant}
          onChange={handleVariantChange}
          className={`p-2 rounded-md text-sm cursor-pointer
                      ${selectBgColor} ${textColor}
                      border ${selectBorderColor}
                      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          width: 'clamp(300px, 80vmin, 700px)',
          height: '500px',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="border-2 border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl"
      >
        <ImageTrail
          key={key}
          items={imageItems}
          variant={currentVariant}
        />
      </div>
      <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Move your mouse over the area above.
      </p>
    </div>
  );
};
export { DemoOne };