import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AiFillLike } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa";

export default function MyPost({ author }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    const userName = `${(decoded.firstName || "").trim()} ${(decoded.lastName || "").trim()}`.trim();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`)
      .then(res => res.json())
      .then(data => {
        let filterName = author
          ? author.trim().toLowerCase()
          : userName.toLowerCase();
        const myPosts = (Array.isArray(data) ? data : data.posts || []).filter(
          post => post.author && post.author.trim().toLowerCase() === filterName
        );
        setPosts(myPosts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [author]);

  if (loading) {
    return <div className="w-full flex justify-center items-center py-10"><span>Loading your posts...</span></div>;
  }

  if (!posts.length) {
    return <div className="w-full flex justify-center items-center py-10"><span>No posts found.</span></div>;
  }

  return (
    <div className="w-full flex max-w-3xl mx-auto mt-8 flex-col gap-8  relative left-[2vw] ">
      {posts.map(post => (
        <div
          key={post._id}
          className="flex flex-row bg-[#575757] rounded-xl shadow p-6 items-center gap-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-xs text-[#adadad] mb-2">
              <span className="font-semibold">In Blog</span>
              <span>by {post.author || "Unknown"}</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-[#fff]">{post.title}</h2>
            <p className="text-[#fff] mb-2 line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-6 mt-2 text-sm text-[#fff]">
              <AiFillLike/><span className="relative right-4">{Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</span>
              <FaComment/><span className="relative right-4"> {post.comments ? post.comments.length : 0}</span>
              <FaLink/><span className="relative right-4"> {post.shares ? post.shares.length : 0}</span>
            </div>
            <span className="text-xs text-gray-400 mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
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