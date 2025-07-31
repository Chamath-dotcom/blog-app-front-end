import UserStatus from "../../components/UserStatus";
import AddPostButton from "../../components/AddPostButton";

export default function ProfilePage() {
  return (
    <div className="flex items-center w-[100vw] max-w-6xl mx-auto">
      <AddPostButton />
      <UserStatus />
    </div>
  );
}