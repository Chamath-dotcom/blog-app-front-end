import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import LoginModal from "../../../components/LoginModal";
import './loginBtn.css';

export default function LoginBtn({ text = "LOGIN", path = "/login" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button className='loginbtn rounded-2xl' onClick={handleClick}>
        <span>{text}</span>
        <div className="wave"></div>
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}