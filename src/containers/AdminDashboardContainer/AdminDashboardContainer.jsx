"use client";
import AdminNav from '@/components/AdminNavbarComponent/AdminNav';
import TiptapEditor from '@/components/EditorComponent/TiptapEditor';
import JobPostForm from '@/components/JobPostingComponent/JobPostForm';
import Sidebar from '@/components/SidebarComponents/Sidebar';
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
      
    </>
  );
}

export default AdminDashboardContainer;