import ProfileBtn from '../pages/home/profileBtn/profileBtn.jsx';

export default function Header(){
    return(
        <header className=" rounded-[30px]  w-[calc(100vw-20vw)] h-[8.2vh] flex justify-between items-center  relative z-10 bg-[#1f1436]">
            <div className=" w-[40vw] h-[8.2vh] flex items-center object-cover">
                <img src="../../public/LOGO.png" alt="logo" className="object-cover w-12 rounded-3xl relative left-3" />
            </div>
            <ProfileBtn />
         </header>
    )
}