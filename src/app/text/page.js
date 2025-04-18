'use client'
import React, { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Hash, AtSign, 
  Smile, Link, Wand2, HelpCircle, BarChart2, 
  Calendar, Accessibility, Share2
} from 'lucide-react';

function App() {
  const [postContent, setPostContent] = useState('');
  const [viewMode, setViewMode] = useState('mobile');

  // Character count calculation
  const charCount = postContent.length;
  
  // Calculate readability and engagement scores (simplified)
  const readabilityScore = 75; // Example score
  const engagementScore = 60; // Example score

  return (
    <div className="font-sans bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">LinkedIn Text Formatter</h1>
        <p className="mt-1">Create engaging, professional LinkedIn posts</p>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Panel: Editor */}
        <div className="flex-grow lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Editor</h2>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Save Draft</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Copy to Clipboard</button>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap gap-2">
            {/* Text Formatting */}
            <button className="border border-gray-300 bg-white rounded p-2"><Bold size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><Italic size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><Underline size={18} /></button>
            <div className="border-l border-gray-300 mx-1"></div>
            
            {/* Lists */}
            <button className="border border-gray-300 bg-white rounded p-2"><List size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><ListOrdered size={18} /></button>
            <div className="border-l border-gray-300 mx-1"></div>
            
            {/* Special Elements */}
            <button className="border border-gray-300 bg-white rounded p-2"><Hash size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><AtSign size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><Smile size={18} /></button>
            <button className="border border-gray-300 bg-white rounded p-2"><Link size={18} /></button>
            <div className="border-l border-gray-300 mx-1"></div>
            
            {/* Templates & AI */}
            <select className="border border-gray-300 bg-white rounded p-2 text-sm">
              <option>Select Template</option>
              <option>Job Posting</option>
              <option>Company Update</option>
              <option>Personal Achievement</option>
              <option>Industry Insight</option>
            </select>
            <button className="border border-gray-300 bg-white rounded p-2 flex items-center gap-1">
              <Wand2 size={18} />
              <span className="text-sm">AI Enhance</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded resize-y font-sans text-sm leading-relaxed"
            placeholder="Write your LinkedIn post here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>

          {/* Character Count */}
          <div className="flex justify-between mt-2 text-gray-500 text-sm">
            <span>Character count: <strong>{charCount}</strong>/3000</span>
            <span>Optimal length for engagement</span>
          </div>

          {/* Enhancement Tools */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-base font-semibold mb-2">Hashtag Suggestions</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm cursor-pointer">#LinkedInTips</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm cursor-pointer">#CareerAdvice</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm cursor-pointer">#ProfessionalDevelopment</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm cursor-pointer">#Networking</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-base font-semibold mb-2">Content Quality</h3>
              <div className="flex items-center mb-2">
                <span className="w-24">Readability:</span>
                <div className="flex-grow bg-gray-300 h-2 rounded-full">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${readabilityScore}%` }}
                  ></div>
                </div>
                <span className="ml-2">Good</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Engagement:</span>
                <div className="flex-grow bg-gray-300 h-2 rounded-full">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${engagementScore}%` }}
                  ></div>
                </div>
                <span className="ml-2">Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview & Settings */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="mb-4 flex gap-2">
              <button 
                className={`flex-1 border border-gray-300 rounded p-2 text-sm ${viewMode === 'mobile' ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
                onClick={() => setViewMode('mobile')}
              >
                Mobile
              </button>
              <button 
                className={`flex-1 border border-gray-300 rounded p-2 text-sm ${viewMode === 'desktop' ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
                onClick={() => setViewMode('desktop')}
              >
                Desktop
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* LinkedIn Post Preview */}
              <div className="bg-gray-100 p-3">
                <div className="bg-white rounded-lg p-4">
                  {/* Profile Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      YN
                    </div>
                    <div className="ml-3">
                      <div className="font-bold">Your Name</div>
                      <div className="text-xs text-gray-500">Your Title • 1s</div>
                    </div>
                  </div>
                  {/* Post Content */}
                  <div className="text-sm leading-relaxed mb-4">
                    {postContent || "Your post will appear here as you type..."}
                  </div>
                  {/* Post Actions */}
                  <div className="flex justify-between pt-3 border-t border-gray-200 text-sm text-gray-500">
                    <span className="cursor-pointer">Like</span>
                    <span className="cursor-pointer">Comment</span>
                    <span className="cursor-pointer">Repost</span>
                    <span className="cursor-pointer">Send</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Advanced Features</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                {/* <Robot size={20} className="text-blue-600" /> */}
                <span className="text-sm">AI Rewrite</span>
              </button>
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <HelpCircle size={20} className="text-blue-600" />
                <span className="text-sm">Add Poll</span>
              </button>
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <BarChart2 size={20} className="text-blue-600" />
                <span className="text-sm">Analytics</span>
              </button>
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <Calendar size={20} className="text-blue-600" />
                <span className="text-sm">Schedule</span>
              </button>
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <Accessibility size={20} className="text-blue-600" />
                <span className="text-sm">Accessibility</span>
              </button>
              <button className="border border-gray-300 rounded p-3 flex flex-col items-center gap-1">
                <Share2 size={20} className="text-blue-600" />
                <span className="text-sm">Cross-post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;