'use client';
import React, { useState } from 'react';

const initialFormState = {
  heading: '',
  description: '',
  thumbnail: '',
  subDescription: '',
};

export default function CreateBlogForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { heading, description, thumbnail, subDescription } = formData;

    const newBlog = {
      heading,
      description,
      thumbnail,
      sub_description: subDescription,
      trending: false,
      show_on_front: false,
      category: ['General'],
      metaTitle: heading,
      metaDescription: description,
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) throw new Error('Failed to create blog');

      const data = await res.json();
      setMessage(` Blog created: ${data.heading}`);
      setFormData(initialFormState);
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          value={formData.heading}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="subDescription"
          placeholder="Sub Description"
          value={formData.subDescription}
          onChange={handleChange}
          rows={2}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Blog
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
