"use client";
import { useEffect, useState } from "react";
import TiptapEditor from "../EditorComponent/TiptapEditor"; // Your rich text editor
import { Unbounded } from "next/font/google";
import { GiCrossMark } from "react-icons/gi";

const unbounded = Unbounded({ subsets: ['latin'], weight: '500' })

const BlogPostForm = () => {
  // ---------------- State Management ----------------
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ heading: "", description: "", thumbnail: "" });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ---------------- Fetch Blogs on Load ----------------
  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:3000/api/blog");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ---------------- Handle Form Submit (Create / Update) ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3000/api/blog/${editingId}`
      : `http://localhost:3000/api/blog`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong");

      setModalOpen(false);
      setFormData({ heading: "", description: "", thumbnail: "" });
      setEditingId(null);
      fetchBlogs(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- Delete Blog ----------------
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
    });
    fetchBlogs();
  };

  // ---------------- Open Modal to Edit ----------------
  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog.id);
    setModalOpen(true);
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-4xl text-center font-bold ${unbounded.className}`}>Blogs</h2>
        <button
          onClick={() => {
            setFormData({ heading: "", description: "", thumbnail: "" });
            setEditingId(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {/* ---------- Table to Display Blogs ---------- */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Heading</th>
            <th className="border px-2 py-1">Thumbnail</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id || index}>
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{blog.heading}</td>
              <td className="border px-2 py-1">
                <img src={blog.thumbnail} alt="thumbnail" className="w-20 h-16 object-cover" />
              </td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- Modal Form for Create / Update ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-full max-w-2xl rounded shadow-lg relative">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Blog" : "Add Blog"}
              </h3>
                  <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingId(null);
                    setFormData({ heading: "", description: "", thumbnail: "" });
                  }}
                 
                >
                  <GiCrossMark />
                </button>

            </div>


            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Heading */}
              <div>
                <label className="block text-sm font-medium">Heading *</label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description *</label>
                <TiptapEditor
                  content={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium">Thumbnail URL *</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingId(null);
                    setFormData({ heading: "", description: "", thumbnail: "" });
                  }}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostForm;
