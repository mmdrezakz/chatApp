import { ArrowBigLeft, Settings } from "lucide-react";

import Button from "../ui/Button";
import { SettingIconProps } from "./type";

export default function SettingIcon({
  handleShowSetting,
  ShowSetting,
}: SettingIconProps) {
  return (
    <Button onClick={handleShowSetting} className="mx-3 my-2 px-4 py-2.5 w-fit">
      {ShowSetting ? <ArrowBigLeft /> : <Settings />}
    </Button>
  );
}
