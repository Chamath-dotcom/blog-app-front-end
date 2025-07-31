import Header from "../../components/header";
import Hero from "./heroSec";
import UserStatus from "../../components/UserStatus";
import PostList from "../../components/PostList"; // <-- Import

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-[#1f1436] w-[100vw] h-[340vh]">
      <Hero />
      <PostList /> {/* <-- Add here */}
    </div>
  );
}