"use client";
import AdminNav from '@/components/AdminNavbarComponent/AdminNav';
import TiptapEditor from '@/components/EditorComponent/TiptapEditor';
import Sidebar from '@/components/Sidebar/Sidebar';
import React, { useState } from 'react';

const AdminDashboardContainer = () => {
  const [content, setContent] = useState('');
  const [submittedContent, setSubmittedContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedContent(content);
  };

  return (
    <>
      <AdminNav />
      {/* <Sidebar /> */}
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rich Text Editor
            </label>
            <TiptapEditor 
              content={content}
              onChange={(html) => setContent(html)}
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {submittedContent && (
          <div className="mt-8 p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Output Preview:</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: submittedContent }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboardContainer;