import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [updateWave, setUpdateWave] = useState(false);
  const [deleteWave, setDeleteWave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setLoading(false);

        // Check if current user is author or admin
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const userName = `${(decoded.firstName || "").trim()} ${(decoded.lastName || "").trim()}`.trim();
          if (
            userName &&
            data.author &&
            userName.toLowerCase() === data.author.trim().toLowerCase()
          ) {
            setIsAuthor(true);
          } else {
            setIsAuthor(false);
          }
          if (decoded.role === "admin") setIsAdmin(true);
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);
    if (editImage) formData.append("image", editImage);

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      setPost(data.post);
      setEditMode(false);
    } else {
      alert(data.message || "Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      alert("Post deleted!");
      navigate("/");
    } else {
      alert(data.message || "Failed to delete post");
    }
  };

  // Like
  const handleLike = async () => {
    setLikeLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/like/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setLikeLoading(false);
    if (res.ok) {
      setPost(p => ({ ...p, likes: data.likes }));
    }
  };

  // Comment
  const handleComment = async () => {
    const token = localStorage.getItem("token");
    if (!commentText) return;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: commentText })
    });
    const data = await res.json();
    if (res.ok) {
      setPost(p => ({ ...p, comments: data.comments }));
      setCommentText("");
    } else {
      alert(data.message || "Failed to add comment");
    }
  };

  // Share
  const handleShare = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/share/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.shareUrl) {
      setShareMsg("Link copied!");
      navigator.clipboard.writeText(data.shareUrl);
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

  // Animation helpers
  const triggerUpdateWave = () => {
    setUpdateWave(true);
    setTimeout(() => setUpdateWave(false), 500);
    setEditMode(true);
  };
  const triggerDeleteWave = () => {
    setDeleteWave(true);
    setTimeout(() => setDeleteWave(false), 500);
    handleDelete();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Post not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <article className="w-full max-w-3xl bg-white mx-auto shadow-lg rounded-xl">
        {/* User Name Above Post */}
        <div className="px-8 pt-8 pb-2 flex items-center gap-3">
          <span
            className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
            onClick={() => navigate(`/profile/${encodeURIComponent(post.author)}`)}
          >
            {post.author || "Unknown"}
          </span>
        </div>
        {post.image && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${post.image}`}
            alt="Post"
            className="w-full h-96 object-cover rounded-b-none rounded-t-xl"
          />
        )}
        <div className="px-8 py-10">
          {editMode ? (
            <>
              <input
                className="w-full text-4xl font-extrabold mb-4 text-gray-900 border-b"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full mt-4 text-lg text-gray-800 border rounded p-2"
                rows={10}
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
              />
              <div className="w-full max-w-sm min-w-[200px] mt-2">
                <label className="block mb-2 text-sm text-slate-600">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={e => setEditImage(e.target.files[0])}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <div className="prose max-w-none text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
              {/* Like, Share, Comment Section */}
              <div className="flex gap-6 mt-8 items-center">
                <button
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                  onClick={handleLike}
                  disabled={likeLoading}
                >
                  👍 <span>{Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</span>
                </button>
                <button
                  className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                  onClick={handleShare}
                >
                  🔗 <span>Share</span>
                </button>
                {shareMsg && (
                  <span className="text-green-600 ml-2">{shareMsg}</span>
                )}
              </div>
              {/* Comment Input */}
              <div className="flex gap-2 mt-6">
                <input
                  type="text"
                  className="border rounded px-2 py-1 flex-1 text-sm text-gray-900"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <button
                  className="px-3 py-1 bg-gray-800 text-white rounded"
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
              {/* Comments */}
              <div className="mt-4">
                {post.comments && post.comments.length > 0 && (
                  <ul>
                    {post.comments.map((c, idx) => (
                      <li key={idx} className="text-sm text-gray-700 mt-1">
                        <b>{c.author}:</b> {c.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {(isAuthor || isAdmin) && (
                <div className="flex gap-2 mt-6">
                  <button
                    className={`px-3 py-1 bg-yellow-500 text-white rounded border-2 border-yellow-600 hover:bg-yellow-600 transition text-sm font-semibold shadow wave-btn${updateWave ? " wave-animate" : ""}`}
                    style={{ minWidth: 0, width: "100px", position: "relative" }}
                    onClick={triggerUpdateWave}
                  >
                    Update
                    <span className="wave"></span>
                  </button>
                  <button
                    className={`px-3 py-1 bg-red-600 text-white rounded border-2 border-red-700 hover:bg-red-700 transition text-sm font-semibold shadow wave-btn${deleteWave ? " wave-animate" : ""}`}
                    style={{ minWidth: 0, width: "100px", position: "relative" }}
                    onClick={triggerDeleteWave}
                  >
                    Delete
                    <span className="wave"></span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </article>
    </div>
  );
}