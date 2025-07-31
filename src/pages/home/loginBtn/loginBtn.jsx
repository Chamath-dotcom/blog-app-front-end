import { useNavigate } from 'react-router-dom'
import'./loginBtn.css'

export default function LoginBtn({ text = "**", onClick , path = "/login"}) {
    const navigate = useNavigate();
    const handleClick = () => {
      if (onClick) {
        onClick(); 
      } else {
        navigate(path);
      }
    };
    return(
        <div  >
        <button className='loginbtn rounded-2xl  ' onClick={handleClick} >
            <span>{text}</span>
            <div className="wave "></div>
        </button>
        </div>
    )
}