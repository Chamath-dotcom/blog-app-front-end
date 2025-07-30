import { useNavigate } from 'react-router-dom';


export default function ProfileBtn({ onClick }) {
  const navigate = useNavigate();
  const handleClick = () => {
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
      <div className="w-[40vw] h-[8.2vh] flex justify-end gap-5 items-center">
        <img src="cart.svg" alt="" className="size-10" />
        <img src="./user-profile-icon.svg" alt="profile" className="mr-2" />
      </div>
    </button>
  );
}