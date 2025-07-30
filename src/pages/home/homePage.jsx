import Header from "../../components/header";
import Hero from "./heroSec";
import UserStatus from "../../components/UserStatus"; // <-- Import the new component

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
   
      <UserStatus /> {/* <-- Use the new component here */}
    </div>
  );
}