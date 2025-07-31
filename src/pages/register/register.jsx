import { useState } from "react";
import LoginBtn from "../home/loginBtn/loginBtn";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();
   
    const handleOnSubmit = async (e) => {
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

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res);
            toast.success("Registration Success");
            navigate("/login");
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error);
        })
    }
    
    return(
        <div className="relative overflow-hidden">
        <div className="login-bg flex relative ">
            <img src="../public/login/speaker.png" alt="speaker" className=" w-[50vw] h-fit absolute bottom-0" />
            <img src="../public/login/plant.png" alt="plant" className=" w-[40vw] h-fit absolute bottom-0 right-0" />
        </div>
            <div className=" w-[30vw] h-[100vw] absolute top-0 right-100 flex flex-col justify-center items-center  ">
                <img src="../public/login/lamp.png" alt="lamp" className=" h-fit absolute top-0 " />
                <div className="form  rounded-3xl flex items-center justify-center absolute top-40 backdrop-blur-sm  " >
                    <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                    <div className=" w-[60vw] h-[70vh]   flex justify-start items-center flex-col gap-6  relative ">
                       
                        <img
                            src="/logo.svg"
                            alt="logo"
                            className="w-[20vw] h-auto object-cover m-10  absolute top-0 "
                        />
                         <div className=" w-[60vw] h-[12vh]  flex justify-center items-center flex-raw gap-6  relative top-30 ">
                            <input
                                type="email"
                                placeholder="Email"
                                className="mt-6 w-[25vw] h-[5vh] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-[25vw] h-[5vh] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                         </div>
                         <div className=" w-[60vw] h-[10vh]  flex justify-center items-center flex-raw gap-6  relative top-30 ">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-[25vw] h-[5vh] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />                        

                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-[25vw] h-[5vh] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />  
                        </div>
                        <div className=" w-[60vw] h-[10vh]  flex justify-center items-center flex-raw gap-6  relative top-30 ">
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-[25vw] h-[5vh] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Address"
                                className="w-[25vw] h-[5vh] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className=" w-[60vw] h-[10vh] flex flex-col justify-center items-center gap-4 relative top-30">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setProfilePicture(e.target.files[0])}
                                className="mt-6 w-[25vw] h-[5vh] bg-transparent border-b-2 border-white text-white text-xl outline-none"
                            />
                        </div>
                        <div className="w-[15vw] h-[6vh]  flex justify-start absolute bottom-10">
                            <LoginBtn/>
                        </div>
                    </div>
                    </form>
                </div>
        </div>
        </div>
    )
}

export async function registerUser(req, res) {
  const userData = req.body;
  if (req.file) {
    userData.profilePicture = req.file.filename;
  }
  // ...rest of your code
}