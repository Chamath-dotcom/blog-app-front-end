import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthorProfilePage() {
  const { author } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`)
      .then(res => res.json())
      .then(data => {
        const authorPosts = (Array.isArray(data) ? data : data.posts || []).filter(
          post => post.author && post.author.trim().toLowerCase() === author.trim().toLowerCase()
        );
        setPosts(authorPosts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [author]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{author}'s Posts</h2>
      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div>No posts found for this author.</div>
      ) : (
        posts.map(post => (
          <div key={post._id} className="mb-6 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}