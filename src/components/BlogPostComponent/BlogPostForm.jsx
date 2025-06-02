"use client";
import { useEffect, useState, useRef } from "react";
import TiptapEditor from "../EditorComponent/TiptapEditor";
import { Unbounded } from "next/font/google";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Toast } from 'primereact/toast';

const unbounded = Unbounded({ subsets: ['latin'], weight: '500' });

const BlogPostForm = () => {
  // State Management
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    heading: "", 
    description: "", 
    thumbnail: "" 
  });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      showToast('error', 'Error', 'Failed to fetch blogs');
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Toast Notification
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  // Form Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError("");

  const method = editingId ? "PUT" : "POST";
  const url = editingId
    ? `http://localhost:3000/api/blog/${encodeURIComponent(formData.heading)}`
    : `http://localhost:3000/api/blog`;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to save blog");
    }

    showToast('success', 'Success', editingId ? 'Blog updated successfully' : 'Blog created successfully');
    setModalOpen(false);
    setFormData({ heading: "", description: "", thumbnail: "" });
    setEditingId(null);
    fetchBlogs();
  } catch (err) {
    console.error("Submission error:", err);
    showToast('error', 'Error', err.message);
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

  // Delete Blog
const handleDelete = async (blog) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${encodeURIComponent(blog.heading)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error('Failed to delete blog');
    
    showToast('success', 'Success', 'Blog deleted successfully');
    fetchBlogs();
  } catch (err) {
    showToast('error', 'Error', err.message);
  }
};

  // Edit Blog
const handleEdit = (blog) => {
  setFormData(blog);
  setEditingId(blog.heading); // Store the heading as the identifier
  setModalOpen(true);
};

  // Search Functionality
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Table Header with Search
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${unbounded.className}`}>Blog Posts</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder=""
          />
        </span>
      </div>
    );
  };

  // Table Columns Templates
  const thumbnailBodyTemplate = (rowData) => {
    return (
      <img 
        src={rowData.thumbnail || 'https://placehold.co/100x60'} 
        alt="thumbnail" 
        className="w-20 h-16 object-cover rounded" 
      />
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <div 
        className="line-clamp-2 max-w-xs" 
        dangerouslySetInnerHTML={{ __html: rowData.description }} 
      />
    );
  };

const actionBodyTemplate = (rowData) => {
  return (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-button-text"
        onClick={() => handleEdit(rowData)}
        tooltip="Edit"
        tooltipOptions={{ position: 'top' }}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => handleDelete(rowData)} // Pass the full rowData
        tooltip="Delete"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );
};

  const header = renderHeader();

  return (
    <div className="p-6">
      <Toast ref={toast} position="top-right" />

      {/* DataTable */}
      <div className="card">
        <DataTable
          value={blogs}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={['heading']}
          header={header}
          emptyMessage="No blog posts found."
        >
          <Column field="heading" header="Title" sortable />
          <Column 
            field="thumbnail" 
            header="Thumbnail" 
            body={thumbnailBodyTemplate} 
          />
          <Column 
            field="description" 
            header="Content" 
            body={descriptionBodyTemplate} 
          />
          <Column 
            body={actionBodyTemplate} 
            header="Actions" 
            style={{ width: '8rem' }} 
          />
        </DataTable>
      </div>

      {/* Floating Add Button */}
      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-raised fixed bottom-5 right-5"
        onClick={() => {
          setFormData({ heading: "", description: "", thumbnail: "" });
          setEditingId(null);
          setModalOpen(true);
        }}
        tooltip="Add New Blog"
      />

      {/* Blog Form Dialog */}
      <Dialog
        visible={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setEditingId(null);
          setFormData({ heading: "", description: "", thumbnail: "" });
        }}
        style={{ width: '50vw' }}
        header={editingId ? "Edit Blog Post" : "Add Blog Post"}
        modal
        className="p-fluid"
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blog Title */}
          <div className="field">
            <label htmlFor="heading" className="font-medium">
              Title *
            </label>
            <InputText
              id="heading"
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              required
            />
          </div>

          {/* Blog Description */}
          <div className="field">
            <label htmlFor="description" className="font-medium">
              Content *
            </label>
            <TiptapEditor
              content={formData.description}
              onChange={(html) =>
                setFormData({ ...formData, description: html })
              }
            />
          </div>

          {/* Thumbnail URL */}
          <div className="field">
            <label htmlFor="thumbnail" className="font-medium">
              Thumbnail URL *
            </label>
            <InputText
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                setModalOpen(false);
                setEditingId(null);
                setFormData({ heading: "", description: "", thumbnail: "" });
              }}
            />
            <Button
              label={isSubmitting ? "Saving..." : "Save"}
              icon="pi pi-check"
              type="submit"
              loading={isSubmitting}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default BlogPostForm;