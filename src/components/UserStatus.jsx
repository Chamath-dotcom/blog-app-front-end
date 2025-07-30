import { useEffect, useState } from "react";
import LoginBtn from "../pages/home/loginBtn/loginBtn";
import { jwtDecode } from "jwt-decode";

export default function UserStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  if (user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center mt-8">
        <img
          src="/user-profile-icon.svg"
          alt="profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="mb-1 text-gray-700">Email: {user.email}</p>
        <p className="mb-1 text-gray-700">Phone: {user.phone}</p>
        <p className="mb-1 text-gray-700">Role: {user.role}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <LoginBtn text="LOGIN" />
    </div>
  );
}