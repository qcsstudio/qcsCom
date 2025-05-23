"use client"
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserIcon, Cog6ToothIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 1, name: 'Dashboard', href: '#', icon: HomeIcon },
    { id: 2, name: 'Profile', href: '#', icon: UserIcon },
    { id: 3, name: 'Settings', href: '#', icon: Cog6ToothIcon },
    { id: 4, name: 'Analytics', href: '#', icon: ChartBarIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 md:w-64`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name.toLowerCase();
            
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.name.toLowerCase())}
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive 
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                <span className="ml-3">{item.name}</span>
              </Link>
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
          
        </div>
      </main>
    </div>
  );
};

export default Sidebar;