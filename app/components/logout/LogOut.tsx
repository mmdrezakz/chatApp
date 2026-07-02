import { LogOut } from "lucide-react";
import Button from "../ui/Button";

type LogoutButtonProps = {
  onLogout: () => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button
      onClick={onLogout}
      className="right-0 bottom-0 absolute mx-3 my-2 px-1 py-1 w-fit"
    >
      <LogOut />
    </Button>
  );
}
