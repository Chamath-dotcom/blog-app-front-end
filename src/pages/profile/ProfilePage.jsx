import { useParams } from "react-router-dom";
import UserStatus from "../../components/UserStatus";
import AddPostButton from "../../components/AddPostButton";
import MyPost from "../../components/myPost";
import "./myPost.css"; // Assuming you have a CSS file for custom styles

export default function ProfilePage() {
  const { author } = useParams();

  return (
    <div className="flex items-center justify-between w-[100vw] h-[100vh] mx-auto bg-[#150f24]">
      {/* Make MyPost scrollable with custom scrollbar */}
      <div className="flex-1 h-[100vh] overflow-y-auto px-4 my-scrollbar ">
        <MyPost author={author} />
      </div>
      <div className="w-[30vw] ">
      <UserStatus author={author} />
      </div>
    </div>
  );
}