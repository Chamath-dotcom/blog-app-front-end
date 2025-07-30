import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { IoAddCircle } from "react-icons/io5"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import './Item.css'

export default function AdminItem(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [itemloaded, setItemloaded] = useState(false);
    
    useEffect(() => {
        if(!itemloaded) {
            const token = localStorage.getItem("token");
             axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data.message);
            setItems(res.data.message); // Use res.data.message instead of res.data
            setItemloaded(true);
        }).catch((err) => {
            console.log(err);
        });
        }
        
    }, [itemloaded]);

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            console.log("Key to delete:", key); // Log the key being used
            setItems(items.filter((item) => item.prod_key !== key));
            const token = localStorage.getItem("token");
            axios
                .delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/deleteProduct/${key}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log(res.data);
                   setItemloaded(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    
    return(
    <div className="w-[96vw] h-[100vh]  ">
            {! itemloaded && ( 
            <div className="  w-[100vw] h-[5vw] flex items-center justify-center">
				<section className="border-4 my-4 border-b-green-500 rounded-full animate-spin bg-0 w-[4vw] h-[4vw]"></section>
              </div>
             )} 
           <div className="  w-[100vw] h-[calc(100vh-4vw)] flex flex-col justify-start items-center relative right-10 ">
            {/* Header Section */}
            <div className=" border w-[85vw] h-[6vh] flex justify-center items-center mt-3 mb-4 backdrop-blur-2xl p-4 rounded-lg ">
                <h2 className="text-2xl font-semibold text-white">Admin Item List</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-auto backdrop-blur-2xl p-4 rounded-lg shadow-md text-black border ">
                <table className="w-[87vw] border-collapse border ">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border px-4 py-2">Key</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Dimensions</th>
                            <th className="border px-4 py-2">Availability</th>
                            <th className="border px-6 py-2">Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => {
                            return(
                            <tr key={product.prod_key} className="text-center hover:bg-gray-400 transition">
                                <td className="border px-4 py-2">{product.prod_key}</td>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.price}</td>
                                <td className="border px-4 py-2">{product.category}</td>
                                <td className="border px-4 py-2">{product.dimensions}</td>
                                <td className="border px-4 py-2">
                                    {product.availability ? "Available" : "Not Available"}
                                </td>
                                <td className="p-1.5 border flex justify-around ">
                                    <button 
                                        onClick={() => {
                                            navigate(`/admin/items/edit`, {state:product});
                                        }} 
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer">
                                        <FaEdit className="inline mr-1" /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(product.prod_key)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition cursor-pointer"
                                    >
                                        <FaTrashAlt className="inline mr-1" /> Delete
                                    </button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <Link to="/admin/items/add" className="fixed bottom-6 right-6">
            <IoAddCircle className=" text-black bg-transparent rounded-2xl text-[60px]  hover:text-white hover:bg-[#808080]  transition duration-600 cursor-pointer" />
        </Link>
    </div>
    )
}