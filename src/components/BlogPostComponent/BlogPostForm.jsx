"use client";
import { useEffect, useState, useRef } from "react";
import TiptapEditor from "../EditorComponent/TiptapEditor";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { AiFillFolderOpen } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { ImCloudUpload } from "react-icons/im";
import Image from "next/image";



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

  // Image Upload Handler -----------------------------------------------------------
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageShow, setImageShow] = useState(null);

  useEffect(()=>{
    if(blogs.length > 0){
      setThumbnail(blogs.thumbnail);
    }
  },[blogs]);

  const handleImageChange = async (e) => {
    setLoading(true);
    const imageData = e?.target?.files[0];
    if (!imageData) return;

    // const tempFileData = URL.createObjectURL(imageData);
    // setImageShow(tempFileData);

    try {
      let fileName = Date.now();
      fileName = String(fileName) + imageData.name;
      const res = await fetch(`/api/s3-upload-url?fileName=${fileName}&fileType=${imageData.type}`);
      const { uploadURL, key } = await res.json();

      // Uploading to the temp url
      const response = await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': imageData.type,
        },
        body: imageData,
      });
      // const tempData = await response.json()
      console.log("Image UPload Response S3: ", response?.url);

      const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
      console.log("Upload Image URL : ", imageUrl);
      setThumbnail(imageUrl); // update your context or state
      setImageShow(imageUrl);
      setLoading(false);
    } catch (error) {
      console.log("Unable to upload Image:", error);
      setLoading(false);
    }
  };

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
      ? `/api/blog/${encodeURIComponent(formData.heading)}`
      : `/api/blog`;
    formData.thumbnail = thumbnail;
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
      const res = await fetch(`/api/blog/${encodeURIComponent(blog.heading)}`, {
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
        <h2 className={`text-2xl font-bold font-unbounded`}>Blog Posts</h2>
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
          <div className="buttonsContainer w-[100%] h-[15rem] flex gap-[1rem] border-[2px] border-dashed border-[#38bdf8]/50 rounded-[.7rem] relative">
            {/* Image Input */}
            {!imageShow && !loading && <><label htmlFor="avatar_Image" className="input w-[100%]  text-[#fff] flex flex-col justify-center items-center transition-all duration-300 ease-in-out hover:scale-[.99] cursor-pointer ">
              <AiFillFolderOpen className="text-[2rem] text-[#c1c1c1]"/>
              <p className="text-[1rem] text-[#c1c1c1]">Upload Image</p>
            </label>
            <input type="file"
              accept='image/*'
              name="avatar_Image"
              id="avatar_Image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            /></>}
            {/* Image Input */}
            {imageShow && !loading && <><label htmlFor="avatar_Image" className="input w-[3rem] h-[3rem] absolute top-[-.5rem] right-[-.5rem] rounded-[50%]  text-[#fff] flex flex-col justify-center items-center transition-all duration-300 ease-in-out hover:scale-[.99] cursor-pointer z-[20] bg-[#38bdf8] ">
              <TfiReload className="text-[1.2rem] text-[#ffffff]"/>
            </label>
            <input type="file"
              accept='image/*'
              name="avatar_Image"
              id="avatar_Image"
              style={{ display: "none" }}
              onChange={handleImageChange}
              
            /></>}

            {imageShow && !loading && (
            <div className="flex justify-center w-[100%] h-[100%]">
              <Image src={imageShow} width={100} height={100} alt="Preview" className="rounded-[.7rem] w-[100%] h-[100%] object-center" />
            </div>)}

            {loading && !imageShow && <div className="loadingContainer w-[100%] h-[100%] flex justify-center items-center input flex-col">
              <ImCloudUpload className="text-[2rem] text-[#c1c1c1]"/>
              <p className="text-[#c1c1c1] mt-[1rem]">Uploading...</p>
            </div>}

          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}

          <div className="flex bottom-[-15px] sticky bg-white justify-end gap-2 mt-4">
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