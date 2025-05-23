'use client';
import React, { useEffect, useState } from 'react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;


  return (
    <div className=" w-[90%] mx-auto p-6">
      <div className=' w-[138px] mx-auto my-6 '>
        <h4 className=' flex justify-center gap-2  bg-gray-100 rounded-e-lg'>
          <img src='/images/Images/servicesLogo.png' />
          <span className=' font-semibold text-sm mt-1 '>Blogs</span>
        </h4>
      </div>
      <h1 className="text-4xl font-semibold text-center mb-4">Beyond the Canvas Stories from QuantumCrafter Studio</h1>


      <div className='w-full flex gap-3 bg-red-300'>
        <div className=' w-[70%] flex border border-black flex-wrap  '>
          
          {blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs found.</p>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="border border-gray-300 w-[406px] h-[460px] rounded-lg p-1 mb-6 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.heading}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-2">{blog.heading}</h3>
                <p className="text-gray-700 mb-3">{blog.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        <div className=' border w-[406px] h-[460px] border-gray-300 rounded-lg'></div>
      </div>
    </div>
  );
}

