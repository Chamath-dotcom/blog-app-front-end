import { useState } from "react";

export default function AddPostButton({ onPostAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        if (onPostAdded) onPostAdded(data.post);
        setTitle("");
        setContent("");
        setImage(null);
        setShowModal(false);
      } else {
        alert(data.message || "Failed to add post");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Post
      </button>
      {showModal && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-backdrop-blur-sm bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative mx-auto w-full max-w-[40rem] rounded-lg overflow-hidden shadow-sm"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative flex flex-col bg-white">
              <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
                <h3 className="text-2xl">Add New Post</h3>
              </div>
              <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Post Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">
                    Content
                  </label>
                  <textarea
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Post Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={e => setImage(e.target.files[0])}
                  />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-slate-800 text-white rounded"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}