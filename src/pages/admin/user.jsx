import { useEffect, useState } from "react";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg text-gray-700">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Users</h2>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Profile</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <img
                    src={
                      user.profilePicture
                        ? user.profilePicture.startsWith("http")
                          ? user.profilePicture
                          : `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.profilePicture}`
                        : "/user-profile-icon.svg"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="py-2 px-4">{user.firstName} {user.lastName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}