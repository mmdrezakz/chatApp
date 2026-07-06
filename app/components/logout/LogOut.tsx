import { LogOut } from "lucide-react";
import Button from "../ui/Button";

type LogoutButtonProps = {
  onLogout: () => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button onClick={onLogout} className="mx-3 my-2 px-4 py-2.5 w-fit">
      <LogOut />
    </Button>
  );
}
