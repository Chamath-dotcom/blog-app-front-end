import { useEffect, useState } from "react";
import LoginBtn from "../pages/home/loginBtn/loginBtn";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AddPostButton from "./AddPostButton";

export default function UserStatus({ author }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If author prop is present, fetch that user's info from backend
    if (author) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users?author=${encodeURIComponent(
          author
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Expecting backend to return user object for this author
          setUser(data.user || null);
          setForm(data.user || {});
          setFollowers(data.user?.followers || []);
          setFollowing(data.user?.following || []);
        })
        .catch(() => setUser(null));
    } else {
      // Fetch logged-in user from backend
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.user || null);
            setForm(data.user || {});
            setFollowers(data.user?.followers || []);
            setFollowing(data.user?.following || []);
          })
          .catch(() => setUser(null));
      } else {
        setUser(null);
      }
    }
  }, [author]);

  useEffect(() => {
    // Check if logged-in user is following this author
    const token = localStorage.getItem("token");
    if (token && user && user.followers) {
      try {
        const decoded = jwtDecode(token);
        setIsFollowing(user.followers.includes(decoded.email));
        setFollowing(decoded.following || []);
      } catch {}
    }
  }, [user]);

  const handleFollow = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ author }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      setIsFollowing(true);
      setFollowers(data.followers);
    }
  };

  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/unfollow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ author }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      setIsFollowing(false);
      setFollowers(data.followers);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "profilePicture") formData.append(key, form[key]);
    });
    if (profilePicFile) formData.append("profilePicture", profilePicFile);

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser); // use backend user object (with full profilePicture URL)
      setEditMode(false);
      setProfilePicFile(null);
      setForm(updatedUser);
      // Optionally, update token if your backend returns a new one
    } else {
      alert("Failed to update profile");
    }
  };

  if (!user) {
    if (author) {
      return (
        <aside className="w-[100vw] max-w-xs flex flex-col items-center border-l min-h-[90vh] py-10 px-6 shadow-sm rounded-xl ">
          <div className="text-gray-400">User not found.</div>
        </aside>
      );
    }
    // Only show login if not viewing another user's profile
    return (
      <div className="mt-8">
        <LoginBtn text="LOGIN" />
      </div>
    );
  }

  if (editMode) {
    return (
      <aside className="w-[100vw] max-w-xs flex flex-col items-center border-l min-h-[90vh] py-10 px-6 shadow-sm rounded-xl ">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col items-center gap-3 w-full"
        >
          <img
            src={
              profilePicFile
                ? URL.createObjectURL(profilePicFile)
                : user.profilePicture
                ? user.profilePicture.startsWith("http")
                  ? user.profilePicture
                  : `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.profilePicture}`
                : "/user-profile-icon.svg"
            }
            alt="profile"
            className="w-24 h-24 rounded-full mb-4 border object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicFile(e.target.files[0])}
          />
          <input
            className="text-white px-2 py-1 rounded"
            value={form.firstName || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, firstName: e.target.value }))
            }
            placeholder="First Name"
          />
          <input
            className="text-black px-2 py-1 rounded"
            value={form.lastName || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, lastName: e.target.value }))
            }
            placeholder="Last Name"
          />
          <input
            className="text-black px-2 py-1 rounded"
            value={form.phone || ""}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="Phone"
          />
          <input
            className="text-black px-2 py-1 rounded"
            value={form.address || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            placeholder="Address"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded mt-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      </aside>
    );
  }

  return (
    <aside className="w-[100vw] max-w-xs flex flex-col items-center justify-between bg-[#222222d8] text-white border-l h-[70vh] py-10 px-6 shadow-sm rounded-xl mr-10">
      <div className="flex flex-col items-center">
        <img
          src={
            user.profilePicture
              ? user.profilePicture.startsWith("http")
                ? user.profilePicture
                : `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.profilePicture}`
              : "/user-profile-icon.svg"
          }
          alt="profile"
          className="w-24 h-24 rounded-full mb-4 border object-cover"
        />
        <h2 className="text-xl font-bold mb-1 text-gray-100">
          {user.firstName || ""} {user.lastName || ""}
        </h2>
        <span className="text-[#777777]">{user.email}</span>
        <button
          className="text-green-700 text-sm mb-6 hover:underline"
          onClick={() => setEditMode(true)}
        >
          Edit profile
        </button>
        <AddPostButton />
        {author && (
          <div className="my-2">
            {isFollowing ? (
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={handleUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <span>Followers: {followers.length}</span>
          <span>Following: {following.length}</span>
        </div>
      </div>
      <div className=" mt-6 pt-4 w-full flex justify-between items-center mb-10 border-2 border-transparent">
        <button
          className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-700 text-white font-bold tracking-widest text-lg shadow"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }}
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
}