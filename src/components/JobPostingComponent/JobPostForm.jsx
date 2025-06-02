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

const JobPostForm = () => {
  // State Management
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    location: "",
    experience: "",
    skills: "",
    workHours: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/career");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      showToast('error', 'Error', 'Failed to fetch jobs');
      console.error("Failed to fetch jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
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
      ? `http://localhost:3000/api/career/${encodeURIComponent(formData.heading)}`
      : `http://localhost:3000/api/career`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save job posting");
      }

      showToast('success', 'Success', editingId ? 'Job updated successfully' : 'Job created successfully');
      setModalOpen(false);
      setFormData({
        heading: "",
        description: "",
        location: "",
        experience: "",
        skills: "",
        workHours: ""
      });
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      console.error("Submission error:", err);
      showToast('error', 'Error', err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Job
  const handleDelete = async (job) => {
    try {
      const res = await fetch(`http://localhost:3000/api/career/${encodeURIComponent(job.heading)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error('Failed to delete job posting');
      
      showToast('success', 'Success', 'Job deleted successfully');
      fetchJobs();
    } catch (err) {
      showToast('error', 'Error', err.message);
    }
  };

  // Edit Job
  const handleEdit = (job) => {
    setFormData(job);
    setEditingId(job.heading); // Store the heading as the identifier
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
        <h2 className={`text-2xl font-bold ${unbounded.className}`}>Job Postings</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search jobs..."
          />
        </span>
      </div>
    );
  };

  // Table Columns Templates
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
          onClick={() => handleDelete(rowData)}
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
          value={jobs}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={['heading', 'location', 'experience', 'skills']}
          header={header}
          emptyMessage="No job postings found."
        >
          <Column field="heading" header="Position" sortable />
          <Column field="location" header="Location" sortable />
          <Column field="experience" header="Experience" sortable />
          <Column field="skills" header="Skills" sortable />
          <Column 
            field="description" 
            header="Description" 
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
          setFormData({
            heading: "",
            description: "",
            location: "",
            experience: "",
            skills: "",
            workHours: ""
          });
          setEditingId(null);
          setModalOpen(true);
        }}
        tooltip="Add New Job"
      />

      {/* Job Form Dialog */}
      <Dialog
        visible={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setEditingId(null);
          setFormData({
            heading: "",
            description: "",
            location: "",
            experience: "",
            skills: "",
            workHours: ""
          });
        }}
        style={{ width: '50vw' }}
        header={editingId ? "Edit Job Posting" : "Add Job Posting"}
        modal
        className="p-fluid"
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div className="field">
            <label htmlFor="heading" className="font-medium">
              Job Title *
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

          {/* Job Description */}
          <div className="field">
            <label htmlFor="description" className="font-medium">
              Description *
            </label>
            <TiptapEditor
              content={formData.description}
              onChange={(html) =>
                setFormData({ ...formData, description: html })
              }
            />
          </div>

          {/* Location */}
          <div className="field">
            <label htmlFor="location" className="font-medium">
              Location *
            </label>
            <InputText
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          {/* Experience */}
          <div className="field">
            <label htmlFor="experience" className="font-medium">
              Experience Required *
            </label>
            <InputText
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
            />
          </div>

          {/* Skills */}
          <div className="field">
            <label htmlFor="skills" className="font-medium">
              Required Skills *
            </label>
            <InputText
              id="skills"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              required
            />
          </div>

          {/* Work Hours */}
          <div className="field">
            <label htmlFor="workHours" className="font-medium">
              Work Hours *
            </label>
            <InputText
              id="workHours"
              value={formData.workHours}
              onChange={(e) =>
                setFormData({ ...formData, workHours: e.target.value })
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
                setFormData({
                  heading: "",
                  description: "",
                  location: "",
                  experience: "",
                  skills: "",
                  workHours: ""
                });
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

export default JobPostForm;