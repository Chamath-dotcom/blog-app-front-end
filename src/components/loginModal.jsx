import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RegisterModal from "./RegisterModal";

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email,
        password,
      });
      toast.success("Login success");
      localStorage.setItem("token", res.data.token);
      onClose();
      window.location.reload(); // or trigger state update as needed
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      {showRegister && <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />}
      {open && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-transparent bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#563A92]">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#563A92] text-white py-2 rounded font-semibold hover:bg-[#432a6a] transition"
              >
                Login
              </button>
              <button
                type="button"
                className="text-[#563A92] underline mt-2"
                onClick={() => {
                  onClose();
                  setShowRegister(true);
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}