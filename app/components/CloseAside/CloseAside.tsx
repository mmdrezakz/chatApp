import { LogOut, PanelRightClose } from "lucide-react";
import Button from "../ui/Button";

type AsideClose = {
  setShowAside: (bolean: boolean) => void;
};

export default function CloseAside({ setShowAside }: AsideClose) {
  return (
    <Button
      className="mx-3 my-2 px-1 py-1 w-fit"
      type="button"
      onClick={() => setShowAside(false)}
    >
      <PanelRightClose />
    </Button>
  );
}
