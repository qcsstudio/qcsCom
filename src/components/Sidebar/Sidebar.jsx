"use client";
import { useState } from 'react';
import { HomeIcon, UserIcon, Cog6ToothIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import JobPostForm from '../JobPostingComponent/JobPostForm';
import BlogPostForm from '../BlogPostComponent/BlogPostForm';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Application from '../ApplicationComponent/Application';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 1, name: 'Job Posts', icon: HomeIcon },
    { id: 2, name: 'Blog Posts', icon: UserIcon },
    { id: 3, name: 'Applications', icon: Cog6ToothIcon },
    { id: 4, name: 'Analytics', icon: ChartBarIcon },
  ];

  const renderComponent = () => {
    switch (activeItem) {
      case 'job posts':
        return <JobPostForm />;
      case 'blog posts':
        return <BlogPostForm/>;
      case 'applications':
        return <Application />;
      case 'analytics':
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex w-full h-full bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 md:w-64`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name.toLowerCase();
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.name.toLowerCase())}
                className={`flex items-center w-full px-6 py-3 text-sm border-none bg-transparent text-left ${
                  isActive 
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                <span className="ml-3">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 bg-gray-200 rounded-lg"
          >
            ☰
          </button>
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;