import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function ProfileBtn({ onClick }) {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("/user-profile-icon.svg");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.profilePicture) {
          setProfilePic(
            decoded.profilePicture.startsWith("http")
              ? decoded.profilePicture
              : `${import.meta.env.VITE_BACKEND_URL}/uploads/${decoded.profilePicture}`
          );
        }
      } catch {}
    }
  }, []);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (onClick) {
      onClick();
    } else {
      navigate("/profile");
    }
  };

  return (
    <button
      className="w-[40vw] h-[8.2vh] flex justify-end items-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="  w-[4vw] h-[4vw] flex justify-end gap-5 items-center">
        <img src={profilePic} alt="profile" className="mr-2 w-[3vw] h-[3vw] rounded-full object-cover" />
      </div>
    </button>
  );
}