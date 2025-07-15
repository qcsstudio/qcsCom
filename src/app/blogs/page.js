import BlogsContainer from '@/containers/BlogsContainer/BlogsContainer'
import React from 'react'

export const metadata = {
  title: "Latest Blogs & Insights | QuantumCrafters Studio Official",
  description: "Explore the latest blogs, tech insights, AI trends, and growth tips by QuantumCrafters Studio. Learn how innovation is driving the future of business.",
};

const page = () => {
  return (
   <>
   <BlogsContainer/>
   </>
  )
}

export default page