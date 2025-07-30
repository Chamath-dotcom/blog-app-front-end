import ProfileBtn from '../pages/home/profileBtn/profileBtn.jsx';

export default function Header(){
    return(
        <header className=" rounded-[30px]  w-[calc(100vw-20vw)] h-[8.2vh] flex justify-between items-center  relative z-10 bg-white">
            <div className=" w-[40vw] h-[8.2vh] flex items-center object-cover">
                <img src="./logo.svg" alt="logo" className="object-cover ml-[20px] "/>
            </div>
            <ProfileBtn />
         </header>
    )
}