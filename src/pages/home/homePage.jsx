import Header from "../../components/header";
import Hero from "./heroSec";
import UserStatus from "../../components/UserStatus";
import PostList from "../../components/PostList"; // <-- Import
import Footer from "../../components/footer"

export default function HomePage() {
  return (
    <div>
    <div className="flex flex-col items-center bg-[#1f1436] w-[100vw] h-[400vh]">
      <Hero />
      <div className="w-[100vw] bg-[#1f1436]">
      <PostList /> {/* <-- Add here */}
      </div>
    </div>
      <Footer/>
    </div>
  );
}