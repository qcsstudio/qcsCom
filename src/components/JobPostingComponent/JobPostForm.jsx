"use client";
import { useState } from 'react';
import TiptapEditor from '../EditorComponent/TiptapEditor';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    location: '',
    experience: '',
    skills: '',
    workHours: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/career/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmittedData(formData);
      setFormData({
        heading: '',
        description: '',
        location: '',
        experience: '',
        skills: '',
        workHours: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to submit job post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="containers w-full flex">
      <div className="w-[80%] mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({...formData, heading: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Description *
            </label>
            <div className="border rounded-md">
              <TiptapEditor
                content={formData.description}
                onChange={(html) => setFormData({...formData, description: html})}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., New York, NY or Remote"
              required
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Experience Required *
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3+ years"
              required
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Required Skills *
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter skills (e.g., JavaScript, React, Node.js)"
              required
            />
          </div>

          {/* Work Hours */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Work Hours *
            </label>
            <input
              type="text"
              value={formData.workHours}
              onChange={(e) => setFormData({...formData, workHours: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full-Time / Part-Time"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Post Job'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}
        </form>

        {submittedData && (
          <div className="mt-8 p-6 border rounded-md bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Preview:</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{submittedData.heading}</h3>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: submittedData.description }} 
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Location:</strong> {submittedData.location}</p>
                  <p><strong>Experience:</strong> {submittedData.experience}</p>
                  <p><strong>Work Hours:</strong> {submittedData.workHours}</p>
                </div>
                <div>
                  <strong>Skills:</strong>
                  <p>{submittedData.skills}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostForm;