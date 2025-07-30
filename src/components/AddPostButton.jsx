import { useState } from "react";

export default function AddPostButton({ onPostAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (res.ok) {
        if (onPostAdded) onPostAdded(data.post);
        setTitle("");
        setContent("");
        setShowForm(false);
      } else {
        alert(data.message || "Failed to add post");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowForm(true)}
      >
        Add Post
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            className="bg-white p-6 rounded shadow-lg flex flex-col gap-3 min-w-[300px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-2">Add New Post</h2>
            <input
              className="border p-2 rounded"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="border p-2 rounded"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}