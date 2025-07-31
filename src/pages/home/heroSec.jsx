import Header from "../../components/header";
import './hero.css';
import LoginBtn from "./loginBtn/loginBtn";
import { useEffect, useState } from "react";

export default function Hero() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center relative ">
            <Header />
            <div className="main relative w-[95vw] h-[50vh] flex justify-center rounded-[20px] bg-[#0B080A] position-relative flex-col items-center">
                <div className='img-div rounded-[20px] flex items-start justify-between'>
                    <img src="../public/Artboard 1.png" alt="img 1" srcset="" className="w-[43vw] justify-center relative left-[18vw] top-[-15vh] z-10" />
                    <div className='  main-title p-[20px] w-[40vw] h-[54.5vh] flex-col justify-center text-start  text-[#C7C7C7] absolute top-[5vh] pl-30 items-start  '>
                        <h1 style={{fontSize:'13vh'}} >M I N D</h1> 
                        <h1>S C A P</h1>
                    </div>
                    
                </div>
                {!isLoggedIn && (
                    <div className="absolute bottom-35 left-20">
                        <LoginBtn text="LOGIN" />
                    </div>
                )}
            </div>
        </div>
    )
}