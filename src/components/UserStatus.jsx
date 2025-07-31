import { useEffect, useState } from "react";
import LoginBtn from "../pages/home/loginBtn/loginBtn";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function UserStatus() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setForm(decoded);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

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
    return (
      <div className="mt-8">
        <LoginBtn text="LOGIN" />
      </div>
    );
  }

  if (editMode) {
    return (
      <aside className="w-[100vw] max-w-xs flex flex-col items-center bg-black text-white border-l min-h-[90vh] py-10 px-6 shadow-sm rounded-xl">
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
            className="text-black px-2 py-1 rounded"
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
    <aside className="w-[100vw] max-w-xs flex flex-col items-center bg-black text-white border-l min-h-[90vh] py-10 px-6 shadow-sm rounded-xl">
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
      <h2 className="text-xl font-bold mb-1 text-gray-900">
        {user.firstName || ""} {user.lastName || ""}
      </h2>
      <span className="text-gray-600 mb-2">{user.email}</span>
      <button
        className="text-green-700 text-sm mb-6 hover:underline"
        onClick={() => setEditMode(true)}
      >
        Edit profile
      </button>
      <div className="w-full flex flex-col gap-2 text-sm text-gray-700">
        {user.phone && (
          <div>
            <span className="font-semibold">Phone:</span> {user.phone}
          </div>
        )}
        {user.role && (
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        )}
      </div>
      <button
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded w-full"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </aside>
  );
}