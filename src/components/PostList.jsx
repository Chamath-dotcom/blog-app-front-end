import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`)
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg text-gray-600">Loading posts...</span>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg" style={{ color: "black" }}>No posts found.</span>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full max-w-4xl mx-auto flex flex-col gap-8 z-999 overflow-y-visible relative top-[50vh]"
      style={{
        height: "calc(100vh - 40vh)",
        minHeight: 0,
      }}
    >
      {posts.map(post => (
        <div
          key={post._id}
          className="flex flex-row bg-[#b3b8b2] rounded-xl shadow p-6 items-center gap-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          {/* Left: Post Info */}
          <div className="flex-1 flex flex-col justify-between h-full">
            {/* Meta Info */}
            <div className="flex items-center gap-2 text-xs text-[#1f1436] mb-2">
              <span className="font-semibold">In Blog</span>
              <span>by {post.author || "Unknown"}</span>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold mb-1 text-gray-900">{post.title}</h2>
            {/* Description */}
            <p className="text-gray-700 mb-2 line-clamp-2">{post.content}</p>
            {/* Like, Comment, Share Counts */}
            <div className="flex items-center gap-6 mt-2 text-sm text-[#1f1436]">
              <span>👍 {Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</span>
              <span>💬 {post.comments ? post.comments.length : 0}</span>
              <span>🔗 {post.shares ? post.shares.length : 0}</span>
            </div>
            {/* Date */}
            <span className="text-xs text-[#1f1436] mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          {/* Right: Image */}
          {post.image && (
            <div className="flex-shrink-0 w-40 h-28 ml-4 rounded overflow-hidden border">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${post.image}`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}