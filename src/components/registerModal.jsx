import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("address", address);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Registration Success");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center bg-transparent bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#563A92]">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" className="border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="text" placeholder="First Name" className="border rounded px-3 py-2" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" className="border rounded px-3 py-2" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="text" placeholder="Phone" className="border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} />
          <input type="text" placeholder="Address" className="border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} />
          <input type="file" accept="image/*" className="border rounded px-3 py-2" onChange={e => setProfilePicture(e.target.files[0])} />
          <button type="submit" className="bg-[#563A92] text-white py-2 rounded font-semibold hover:bg-[#432a6a] transition">Register</button>
        </form>
      </div>
    </div>
  );
}