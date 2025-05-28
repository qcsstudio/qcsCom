"use client"
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ onFileSelected }) => {  // Added onFileSelected prop
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/*': ['.pdf', '.doc', '.docx', '.txt']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: acceptedFiles => {
      setError('');
      const filesWithPreview = acceptedFiles.map(file => ({
        ...file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      setFiles(filesWithPreview);
      if (onFileSelected) {  // Added null check
        onFileSelected(acceptedFiles[0]); // Pass selected file to parent
      }
    },
    onDropRejected: fileRejections => {
      setError(fileRejections[0].errors[0].message);
    }
  });

  // Cleanup preview URLs
  useEffect(() => {
    return () => files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
  }, [files]);

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop your resume/CV here or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PNG, JPG, PDF, DOC (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Selected Files:</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center p-2 border rounded bg-gray-50"
              >
                {file.preview && (  // Only show preview for images
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-12 h-12 object-cover mr-3 rounded"
                    onLoad={() => {
                      // Revoke the data uri to avoid memory leaks
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                )}
                <div>
                  <p className="font-medium">{file.name}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;