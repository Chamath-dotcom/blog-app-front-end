import { Tooltip } from "react-tooltip";
import { Link, Route, Routes } from "react-router-dom";
import { MdDashboard, MdPowerSettingsNew } from "react-icons/md";
import { FaSwatchbook, FaUsers } from "react-icons/fa";
import { BiSolidSpeaker } from "react-icons/bi";
import "./admin.css"
import AdminItem from "./adminItem";
import AddItem from "./additem";
import UpdateItem from "./updateItem";
import AdminUserList from "./user";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex overflow-hidden backg ">
      <div className="w-[4vw] h-full  flex flex-col justify-start  items-center text-[20px] gap-3 backdrop-blur-2xl z-20">

        <Link to="/admin/" className="mt-6 " data-tooltip-id="dashboard-tooltip">
            <div className="icon duration-600">
                <MdDashboard />
            </div>
        </Link>
        <Tooltip id="dashboard-tooltip" place="right" content="Go to Dashboard" />

        <Link to="/admin/bookings"  data-tooltip-id="bookings-tooltip">
            <div className=" icon duration-600">
                <FaSwatchbook />
            </div>
        </Link>
        <Tooltip id="bookings-tooltip" place="right" content="View Bookings" />

        <Link to="/admin/items"  data-tooltip-id="items-tooltip">
            <div className=" icon duration-600">
                <BiSolidSpeaker/>
            </div>
        </Link>
        <Tooltip id="items-tooltip" place="right" content="Manage Items" />

        <Link to="/admin/users"  data-tooltip-id="users-tooltip">
            <div className=" icon duration-600">
                <FaUsers/>
            </div>
        </Link>
        <Tooltip id="users-tooltip" place="right" content="Manage Users" />

        
        <Link to="/" className="absolute bottom-5">
            <div className=" icon duration-600 " id="logout">
                <MdPowerSettingsNew />
            </div>
        </Link>
        

      </div>

      {/* Main Content */}
      <div className="w-[calc(100vw-10vw)] ">
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/bookings" element={<h1>Bookings</h1>} />
          <Route path="/items" element={<AdminItem/>} />
          <Route path="/items/add" element={<AddItem/>} />
          <Route path="/items/edit" element={<UpdateItem/>} />
          <Route path="/users" element={<AdminUserList />} />
          
        </Routes>
      </div>
    </div>
  );
}
