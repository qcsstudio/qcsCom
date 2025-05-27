'use client';
import { Syne, Unbounded } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaChevronRight ,FaChevronLeft } from "react-icons/fa";

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });
const syne = Syne({ subsets: ['latin'], weight: '400' });

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setBlogs(data);
      setLoading(false);

      // Reset current page if the new data changes page count
      const totalPages = Math.ceil(data.length / blogsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const interval = setInterval(() => {
      fetchBlogs();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const getPageNumbers = (totalPages, currentPage) => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-[90%] mx-auto p-6">
      <div className="w-[138px] mx-auto my-6">
        <h4 className="flex justify-center gap-2 bg-gray-100 rounded-e-lg">
          <Image src="/images/Images/servicesLogo.png" alt="Services Logo" width={10} height={10} />
          <span className="font-semibold text-sm mt-1">Blogs</span>
        </h4>
      </div>
      <h1 className="text-4xl font-semibold text-center mb-4">
        Beyond the Canvas Stories from QuantumCrafter Studio
      </h1>

      <div className="flex gap-6">
        {/* Main blog list */}
        <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No blogs found.</p>
          ) : (
            currentBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-[#F5F7F9] rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={blog.thumbnail}
                  width={364.06}
                  height={242}
                  alt={blog.heading}
                  className="w-full h-[242px] object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <h3 className={`text-xl font-semibold mb-2 ${unbounded.className} Blog-heading`}>
                  {blog.heading}
                </h3>
                <p className={`text-sm text-gray-500 ${syne.className}`}>
                  Created: {new Date(blog.createdAt).toLocaleString()}
                </p>
                <p className={`text-gray-700 mb-3 ${syne.className} Blog-description`}>
                  {blog.description}
                </p>

                <Link
                  href={`/blogs/${blog?.heading}`}
                  className="text-[#FFFEF5] rounded-lg text-base bg-[#000000] px-[8.95rem] py-2 text-center"
                >
                  Read More
                </Link>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mb-10 col-span-full">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
               <FaChevronLeft />
            </button>

            {getPageNumbers(totalPages, currentPage).map((page, index) =>
              page === '...' ? (
                <span key={index} className="px-3 py-1 rounded border text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    page === currentPage
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="rounded-lg w-[30%] h-[530px] px-5 py-8 bg-[#F5F7F9] no-scrollbar">
          <h2 className={`text-[26px] font-bold mb-4 ${unbounded.className}`}>Recent Post's</h2>
          <div className="space-y-4">
            {blogs
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((blog, index) => (
                <Link
                  href={`/blogs/${blog?.heading}`}
                  key={index}
                  className="flex gap-3 items-start border-b border-gray-300 pb-3 hover:bg-gray-100 transition rounded-md p-2"
                >
                  <Image
                    src={blog.thumbnail}
                    width={64}
                    height={64}
                    alt={blog.heading}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className={`text-sm font-semibold leading-snug ${syne.className}`}>
                      {blog.heading.length > 50 ? blog.heading.slice(0, 47) + '...' : blog.heading}
                    </p>
                    <p className={`text-xs text-gray-500 ${syne.className}`}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
