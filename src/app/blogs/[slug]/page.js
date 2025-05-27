'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavbarContainer from '@/containers/ServiceContainer/NavbarContainer/NavbarContainer';
import { Syne, Unbounded } from 'next/font/google';
import Link from 'next/link';

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });
const syne = Syne({ subsets: ['latin'], weight: '400' });

export default function Page() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error('Failed to fetch blog');
      const data = await res.json();
      setBlog(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching recent blogs:', err);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
      fetchBlogs();
    }

    const interval = setInterval(() => {
      fetchBlogs();
    }, 10000);

    return () => clearInterval(interval);
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!blog) return <p className="text-center mt-10">No blog found.</p>;

  // Pagination logic:
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

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
    <>
      <NavbarContainer
        data={{
          heading: blog.heading,
          para: blog.description?.substring(0, 245) + '...',
          buttons: [
            {
              text: new Date(blog.createdAt).toLocaleDateString(),
              link: '#',
              color: 'transparent',
              border: 'none',
            },
          ],
        }}
      />

      <div className="w-[90%] flex gap-6 mx-auto p-6">
        {/* Blog Detail */}
        <div className="w-[70%]">
          <img
            src={blog.thumbnail}
            alt={blog.heading}
            className="w-full h-72 object-fill rounded-lg mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">{blog.heading}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Created: {new Date(blog.createdAt).toLocaleString()}
          </p>
          <div
            className="text-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>

        {/* Recent Posts */}
        <div className="rounded-lg w-[30%] h-[530px] px-5 py-8 bg-[#F5F7F9] overflow-y-auto no-scrollbar">
          <h2 className={`text-[26px] font-bold mb-4 ${unbounded.className}`}>Recent Post's</h2>
          <div className="space-y-4">
            {blogs
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((recentBlog, index) => (
                <Link
                  key={index}
                  href={`/blogs/${encodeURIComponent(recentBlog.heading)}`}
                  className="flex gap-3 items-start border-b border-gray-300 pb-3 hover:bg-gray-100 transition rounded-md p-2"
                >
                  <img
                    src={recentBlog.thumbnail}
                    alt={recentBlog.heading}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className={`text-sm font-semibold leading-snug ${syne.className}`}>
                      {recentBlog.heading.length > 50
                        ? recentBlog.heading.slice(0, 47) + '...'
                        : recentBlog.heading}
                    </p>
                    <p className={`text-xs text-gray-500 ${syne.className}`}>
                      {new Date(recentBlog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* More blogs  */}
      <div className="w-[90%] mx-auto mt-10">
        <h3 className={`text-center text-4xl my-5 font-medium ${unbounded.className}`}>More Blogs</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {currentBlogs.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No blogs found.</p>
          ) : (
            currentBlogs.map((blog, i) => (
              <div
                key={i}
                className="bg-[#F5F7F9] rounded-lg p-3 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.heading}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <h4 className={`text-xl font-semibold mb-2  ${unbounded.className}`}>
                  {blog.heading.length > 50 ? blog.heading.slice(0, 47) + '...' : blog.heading}
                </h4>
                <p className={`text-sm text-gray-500 mb-2 ${syne.className}`}>
                  Created: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className={`text-gray-700 mb-3 ${syne.className} Blog-description`}>
                  {blog.description.length > 100 ? blog.description.slice(0, 97) + '...' : blog.description}
                </p>
                <Link
                  href={`/blogs/${encodeURIComponent(blog.heading)}`}
                  className="text-white bg-black w-full text-center px-6 py-2 rounded-md inline-block"
                >
                  Read More
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Pagination buttons */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            &lt;
          </button>

          {getPageNumbers(totalPages, currentPage).map((page, index) =>
            page === '...' ? (
              <span
                key={index}
                className="px-3 py-1 rounded border text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${page === currentPage ? 'bg-purple-600 text-white border-purple-600' : 'hover:bg-gray-100'
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
            &gt;
          </button>
        </div>

      </div>
    </>
  );
}
