import { useEffect, useState } from "react";

export default function AdminItem() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg text-gray-700">Loading posts...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Posts</h2>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Author</th>
              <th className="py-2 px-4">Likes</th>
              <th className="py-2 px-4">Comments</th>
              <th className="py-2 px-4">Shares</th>
              <th className="py-2 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  {post.image && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${post.image}`}
                      alt="Post"
                      className="w-16 h-12 object-cover rounded border"
                    />
                  )}
                </td>
                <td className="py-2 px-4 font-semibold">{post.title}</td>
                <td className="py-2 px-4">{post.author}</td>
                <td className="py-2 px-4">{Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</td>
                <td className="py-2 px-4">{post.comments ? post.comments.length : 0}</td>
                <td className="py-2 px-4">{post.shares ? post.shares.length : 0}</td>
                <td className="py-2 px-4">{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}