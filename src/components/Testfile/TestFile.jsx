'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TextFile({ email }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  const fetchApplications = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `/api/email?${
        email ? `email=${encodeURIComponent(email)}&` : ''
      }page=${page}&limit=${pagination.limit}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`);
      }
      
      const data = await response.json();
      
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to fetch applications');
      }
      
      setApplications(data.data || []);
      setPagination(data.pagination || {
        page,
        limit: pagination.limit,
        total: data.data?.length || 0,
        pages: 1
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [email]);

  if (loading) return <div className="text-center py-8">Loading applications...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!applications.length) return <div className="text-center py-8">No applications found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {email ? `Applications for ${email}` : 'All Applications'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div key={app._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
            <p className="text-gray-600 mb-1">{app.email}</p>
            <p className="text-gray-600 mb-3">{app.location}</p>
            
            {app.fileMeta && app.fileMeta.fileId && (
              <div className="mt-4 border-t pt-3">
                <h3 className="font-medium mb-2">Uploaded File:</h3>
                <div className="flex items-center justify-between">
                  <span className="truncate">{app.fileMeta.filename}</span>
                  <span className="text-sm text-gray-500">
                    {app.fileMeta.size ? `${(app.fileMeta.size / 1024).toFixed(1)} KB` : 'N/A'}
                  </span>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <a
                    href={`/api/email?download=${app.fileMeta.fileId}`}
                    download={app.fileMeta.filename}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Download
                  </a>
                  
                  {app.fileMeta.contentType?.startsWith('image/') && (
                    <Link
                      href={`/api/email?download=${app.fileMeta.fileId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => fetchApplications(pageNum)}
              className={`px-3 py-1 rounded ${
                pagination.page === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}