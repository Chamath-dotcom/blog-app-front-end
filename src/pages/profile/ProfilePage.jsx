import UserStatus from "../../components/UserStatus";
import AddPostButton from "../../components/AddPostButton";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center">
      <UserStatus />
        <AddPostButton />
    </div>
  );
}