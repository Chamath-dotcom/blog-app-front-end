import Header from "../../components/header";
import './hero.css';
import LoginBtn from "./loginBtn/loginBtn";

export default function Hero(){
    return(
        <div className=" flex flex-col justify-center items-center relative ">
        <Header/>
        <div className="main relative w-[95vw] h-[50vh]  flex justify-center rounded-[20px] bg-[#0B080A] ">
            <div className='img-div rounded-[20px] flex items-center justify-between '>
                <div className='main-title p-[20px]  w-[45vw] h-[54.5vh] flex-col justify-center text-start text-[#C7C7C7] absolute top-7'>
                    <h1>Perfect Sound</h1>
                    <h1>Every Time</h1>   
                </div>
            <div className='discription  w-[58vw] h-[50vh] flex text-end items-end text-[#ffffff] bg-[#00000059] pl-[10px] pr-[15px] pb-[3%] mr-[5px] absolute right-0'>
               <h1>Our wide range of audio equipment ensures perfect sound for any event. No matter the size, we have the right solutions to make your experience seamless.</h1>
            </div>
            </div>
        <div className="absolute bottom-35 left-20">
            <LoginBtn text="LOGIN"/>
        </div>
        </div>
        </div>
    )
}